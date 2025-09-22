import { Component, OnInit, OnDestroy, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, switchMap, of } from 'rxjs';
import { ProductService } from '../../../../core/services/product.service';
import { ListProduct } from '../../../../core/models/products/list.product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly destroy$ = new Subject<void>();

  readonly product = signal<ListProduct | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.loadProduct();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack(): void {
    this.router.navigate(['/admin/products']);
  }

  private loadProduct(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          const productId = this.extractProductId(params['id']);
          if (!productId) {
            this.error.set('Geçersiz ürün ID');
            this.isLoading.set(false);
            return of(null);
          }
          
          this.error.set(null);
          
          return this.productService.getById(productId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (product) => {
          this.product.set(product);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Ürün yüklenirken bir hata oluştu');
          this.isLoading.set(false);
        }
      });
  }

  private extractProductId(id: string): number | null {
    const productId = +id;
    return (!isNaN(productId) && productId > 0) ? productId : null;
  }
}
