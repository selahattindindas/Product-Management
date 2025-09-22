import { ChangeDetectionStrategy, Component, inject, signal, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListProduct } from '../../../../core/models/products/list.product';
import { ListCategory } from '../../../../core/models/categories/list-category';
import { CategoryService } from '../../../../core/services/category.service';
import { ColorService } from '../../../../core/services/color.service';
import { ProductService } from '../../../../core/services/product.service';
import { ListColor } from '../../../../core/models/colors/list-color';
import { ValidationDirective, ColorFillDirective } from '../../../../shared/directives';
import { AppMessages } from '../../../../core/constants/messages';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, ValidationDirective, ColorFillDirective],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private colorService = inject(ColorService);
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>();

  @Input() productId?: number;
  @Input() isEditMode = false;
  @Input() submitButtonText?: string;
  @Input() cancelButtonText = 'İptal';
  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;
  @Output() formSubmitted = new EventEmitter<{ formData: any; productId?: number }>();
  @Output() formCancelled = new EventEmitter<void>();

  isInitialLoading = signal(false);
  currentProduct = signal<ListProduct | null>(null);
  listCategory = signal<ListCategory[]>([]);
  listColor = signal<ListColor[]>([]);

  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
    price: ['', [Validators.required, Validators.min(0.01), Validators.max(999999.99)]],
    categoryId: ['', [Validators.required]],
    colorIds: [[], [Validators.required, Validators.minLength(1)]]
  });

  ngOnInit(): void {
    this.getCategories();
    this.getColors();
    
    if (this.isEditMode && this.productId) {
      this.isInitialLoading.set(true);
      this.loadProduct();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCategories(): void {
    this.categoryService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories: ListCategory[]) => {
          this.listCategory.set(categories);
        },
        error: (err) => {
          this.listCategory.set([]);
        }
      });
  }

  getColors(): void {
    this.colorService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (colors: ListColor[]) => {
          this.listColor.set(colors);
        },
        error: (err) => {
          this.listColor.set([]);
        }
      });
  }

  private loadProduct(): void {
    if (!this.productId) {
      this.isInitialLoading.set(false);
      return;
    }

    this.productService.getById(this.productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (product: ListProduct) => {
          this.currentProduct.set(product);
          this.populateForm(product);
          this.isInitialLoading.set(false);
        },
        error: (err: any) => {
          // Note: Error handling should be managed by parent component
          // For now, we'll just stop loading
          this.isInitialLoading.set(false);
        }
      });
  }

  private populateForm(product: ListProduct): void {
    const category = this.listCategory().find(cat => cat.name === product.categoryName);
    const colorIds = product.productColors ? product.productColors.map(productColor => productColor.colorId) : [];

    this.productForm.patchValue({
      name: product.name,
      description: product.description || '',
      price: product.price,
      categoryId: category?.id || '',
      colorIds: colorIds
    });
  }

  // Form submit edildiğinde parent component'e data gönderir
  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = {
        name: this.productForm.value.name,
        description: this.productForm.value.description || undefined,
        price: parseFloat(this.productForm.value.price),
        categoryId: this.productForm.value.categoryId,
        colorIds: this.productForm.value.colorIds
      };

      this.formSubmitted.emit({ 
        formData, 
        productId: this.productId 
      });
    } else {
      this.markFormGroupTouched();
    }
  }


  onCancel(): void {
    this.formCancelled.emit();
  }

  // Renk seçimi toggle eder (çoklu seçim için)
  toggleColorSelection(colorId: number): void {
    const currentColorIds = this.productForm.get('colorIds')?.value || [];
    const updatedColorIds = currentColorIds.includes(colorId)
      ? currentColorIds.filter((id: number) => id !== colorId)
      : [...currentColorIds, colorId];

    this.productForm.get('colorIds')?.setValue(updatedColorIds);
  }

  isColorSelected(colorId: number): boolean {
    const currentColorIds = this.productForm.get('colorIds')?.value || [];
    return currentColorIds.includes(colorId);
  }

  private markFormGroupTouched(): void {
    Object.values(this.productForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
