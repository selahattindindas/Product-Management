import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'products',
        loadComponent: () => import('./components/products/product-list/product-list.component').then(m => m.ProductListComponent),
        data: { title: 'Ürünler' }
      },
      {
        path: 'products/detail/:id',
        loadComponent: () => import('./components/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
        data: { title: 'Ürün Detayı' }
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
