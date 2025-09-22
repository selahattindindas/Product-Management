import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: '',
      loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    },
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      canActivate: [authGuard],
      data: { title: 'Admin Panel' }
    },
    {
      path: '**',
      redirectTo: '/login'
    }
];
