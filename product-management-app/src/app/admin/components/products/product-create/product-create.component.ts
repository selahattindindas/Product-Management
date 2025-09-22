import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../../../../core/services/product.service';
import { SweetAlertService } from '../../../../core/services/common/sweetalert.service';
import { CreateProduct } from '../../../../core/models/products/create-product';
import { AppMessages } from '../../../../core/constants/messages';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, ProductFormComponent],
    templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent {
  private activeModal = inject(NgbActiveModal);
  private productService = inject(ProductService);
  private sweetAlertService = inject(SweetAlertService);
  private destroy$ = new Subject<void>();

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onFormSubmitted(event: { formData: any }): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const productData: CreateProduct = {
      name: event.formData.name,
      description: event.formData.description,
      price: event.formData.price,
      categoryId: event.formData.categoryId,
      colorIds: event.formData.colorIds
    };

    this.productService.create(productData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.sweetAlertService.showMessage(AppMessages.SUCCESS).then(() => {
            this.activeModal.close({ success: true, data: response });
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