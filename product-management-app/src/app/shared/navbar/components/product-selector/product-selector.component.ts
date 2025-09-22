import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, signal, inject, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule } from 'devextreme-angular';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../../../core/services/product.service';
import { ListProduct } from '../../../../core/models/products/list.product';

@Component({
  selector: 'app-product-selector',
  standalone: true,
  imports: [CommonModule, DxSelectBoxModule],
  templateUrl: './product-selector.component.html',
  styleUrl: './product-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSelectorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() currentProductId: number | null = null;
  @Output() productChange = new EventEmitter<number>();

  private readonly productService = inject(ProductService);
  private readonly destroy$ = new Subject<void>();

  readonly productOptions = signal<ListProduct[]>([]);
  readonly selectedProduct = signal<ListProduct | null>(null);
  readonly isLoadingProducts = signal<boolean>(false);

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProductId']?.currentValue !== undefined) {
      this.setSelectedProduct();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProductSelectionChange(event: any): void {
    const selectedValue = event.value;
    const selectedProductId = this.extractProductId(selectedValue);
    
    if (selectedProductId) {
      const selectedProduct = this.findProductById(selectedProductId);
      this.selectedProduct.set(selectedProduct);
      this.productChange.emit(selectedProductId);
    } else {
      this.selectedProduct.set(null);
    }
  }

  private loadProducts(): void {
    this.isLoadingProducts.set(true);
    
    this.productService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.productOptions.set(products || []);
          this.setSelectedProduct();
          this.isLoadingProducts.set(false);
        },
        error: () => {
          this.productOptions.set([]);
          this.isLoadingProducts.set(false);
        }
      });
  }

  private setSelectedProduct(): void {
    if (this.currentProductId && this.productOptions().length > 0) {
      const product = this.findProductById(this.currentProductId);
      this.selectedProduct.set(product);
    } else {
      this.selectedProduct.set(null);
    }
  }

  private findProductById(id: number): ListProduct | null {
    return this.productOptions().find(p => p.id === id) || null;
  }

  private extractProductId(value: any): number | null {
    if (typeof value === 'object' && value?.id) {
      return value.id;
    }
    if (typeof value === 'number') {
      return value;
    }
    return null;
  }
}


