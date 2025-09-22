import { Component, signal, OnInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { TitleService } from '../../../core/services/title.service';
import { filter, takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly titleService = inject(TitleService);
  private readonly destroy$ = new Subject<void>();

  readonly showProductSelector = signal<boolean>(true);
  readonly currentProductId = signal<number | null>(null);

  ngOnInit(): void {
    this.setupRouteListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProductChange(productId: number): void {
    if (productId && productId !== this.currentProductId()) {
      this.router.navigate(['/admin/products/detail', productId]);
    }
  }

  private setupRouteListener(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateCurrentProductId(event.url);
      });

    this.updateCurrentProductId(this.router.url);
  }

  private updateCurrentProductId(url: string): void {
    const productDetailMatch = url.match(/\/admin\/products\/detail\/(\d+)/);
    const productId = productDetailMatch ? parseInt(productDetailMatch[1], 10) : null;
    this.currentProductId.set(productId);
    
    // Ürünler listesi sayfasına döndüğünde seçili ürünü temizle
    if (url === '/admin/products' || url.endsWith('/admin/products')) {
      this.titleService.setSelectedProduct(null);
    }
  }
}
