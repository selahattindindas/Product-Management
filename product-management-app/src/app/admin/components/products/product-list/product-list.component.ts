import { Component, inject, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DxDataGridModule, DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxTemplateModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { DialogService } from '../../../../core/services/common/dialog.service';
import { SweetAlertService } from '../../../../core/services/common/sweetalert.service';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ColorFillDirective } from '../../../../shared/directives';
import CustomStore from 'devextreme/data/custom_store';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [DxDataGridModule, DxTemplateModule, CommonModule, ColorFillDirective],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly dialogService = inject(DialogService);
  private readonly destroy$ = new Subject<void>();

  readonly pageSize = 5;
  dataSource: CustomStore;

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

  constructor() {
    this.dataSource = this.createDataSource();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // DevExtreme DataGrid için data source oluşturur
  private createDataSource(): CustomStore {
    return new CustomStore({
      key: "id",
      load: (loadOptions: any) => {
        const page = (loadOptions.skip / loadOptions.take) + 1 || 1;
        const pageSize = loadOptions.take || this.pageSize;

        return firstValueFrom(
          this.productService.getProductPaginated(page, pageSize)
            .pipe(takeUntil(this.destroy$))
        ).then(response => ({
          data: response.products,
          totalCount: response.totalCount
        }));
      }
    });
  }

  private refreshDataGrid(): void {
    if (this.dataGrid?.instance) {
      this.dataGrid.instance.refresh();
    }
  }

  deleteProduct(id: number): void {
    this.sweetAlertService.confirmation().then(result => {
      if (result.isConfirmed) {
        this.productService.delete(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.sweetAlertService.showMessage('Ürün başarıyla silindi!').then(() => {
                this.refreshDataGrid();
              });
            },
            error: (err) => console.error(err)
          });
      }
    });
  }

  createProduct(): void {
    this.dialogService.openDialog({
      componentType: ProductCreateComponent,
      afterClosed: (result) => {
        if (result?.success) {
          this.refreshDataGrid();
        }
      }
    });
  }

  editProduct(productId: number): void {
    this.dialogService.openDialog({
      componentType: ProductUpdateComponent,
      data: { productId },
      afterClosed: (result) => {
        if (result?.success) {
          this.refreshDataGrid();
        }
      }
    });
  }

  getCategoryClass(categoryName: string): string {
    const categoryMap: Record<string, string> = {
      'Elektronik': 'elektronik',
      'Giyim': 'giyim',
      'Ev & Yaşam': 'ev-yasam',
      'Spor': 'spor',
      'Kitap': 'kitap',
      'Kozmetik': 'kozmetik',
      'Oyuncak': 'oyuncak',
      'Müzik': 'muzik',
      'Bahçe': 'bahce',
      'Otomotiv': 'otomotiv'
    };

    return categoryMap[categoryName] ?? 'default';
  }
}
