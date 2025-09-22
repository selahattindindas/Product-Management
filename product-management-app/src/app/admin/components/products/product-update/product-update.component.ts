import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../../../../core/services/product.service';
import { SweetAlertService } from '../../../../core/services/common/sweetalert.service';
import { UpdateProduct } from '../../../../core/models/products/update.product';
import { AppMessages } from '../../../../core/constants/messages';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-product-update',
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductUpdateComponent {
  private activeModal = inject(NgbActiveModal);
  private productService = inject(ProductService);
  private sweetAlertService = inject(SweetAlertService);
  private destroy$ = new Subject<void>();

  data: { productId: number } | undefined;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onFormSubmitted(event: { formData: any; productId?: number }): void {
    if (!this.data?.productId) {
      this.errorMessage.set('Ürün ID bulunamadı');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const productData: UpdateProduct = {
      id: this.data.productId,
      name: event.formData.name,
      description: event.formData.description,
      price: event.formData.price,
      categoryId: event.formData.categoryId,
      colorIds: event.formData.colorIds
    };

    this.productService.update(productData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.sweetAlertService.showMessage(AppMessages.SUCCESS).then(() => {
            this.activeModal.close({ success: true, productId: this.data?.productId });
          });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.message ?? AppMessages.UNEXPECTED_ERROR);
        }
      });
  }

  onFormCancelled(): void {
    this.activeModal.dismiss('cancel');
  }
}
