import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from '../shared/layout/public-layout/public-layout.component';
import { publicGuard } from '../core/guards/public.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    canActivate: [publicGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
        data: { title: 'Giriş Yap' }
      },
      {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),
        data: { title: 'Kayıt Ol' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

