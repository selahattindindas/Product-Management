import { Component, Input, Output, EventEmitter, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { TitleNavComponent } from './components/title-nav/title-nav.component';
import { ProductSelectorComponent } from './components/product-selector/product-selector.component';
import { TitleService } from '../../core/services/title.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AuthNavComponent, TitleNavComponent, ProductSelectorComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() showProductSelector: boolean = false;
  @Input() currentProductId: number | null = null;
  @Output() productChange = new EventEmitter<number>();

  private readonly titleService = inject(TitleService);
  private readonly productService = inject(ProductService);

  onProductChange(productId: number): void {
    this.productChange.emit(productId);
    this.updateTitleWithProduct(productId);
  }

  private updateTitleWithProduct(productId: number): void {
    this.productService.getById(productId).subscribe({
      next: (product) => {
        this.titleService.setSelectedProduct(product);
      },
      error: () => {
        this.titleService.setSelectedProduct(null);
      }
    });
  }
}
