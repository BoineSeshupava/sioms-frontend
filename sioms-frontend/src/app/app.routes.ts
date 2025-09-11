import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/products/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'my-orders',
    loadComponent: () =>
      import('./modules/customer/my-orders/my-orders.component').then(
        (m) => m.MyOrdersComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Customer'] },
  },
  {
    path: 'admin/warehouse-list',
    loadComponent: () =>
      import('./modules/admin/warehouse-list/warehouse-list.component').then(
        (m) => m.WarehouseListComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'add-warehouse',
    loadComponent: () =>
      import('./modules/admin/add-warehouse/add-warehouse.component').then(
        (m) => m.AddWarehouseComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'edit-warehouse/:id',
    loadComponent: () =>
      import('./modules/admin/edit-warehouse/edit-warehouse.component').then(
        (m) => m.EditWarehouseComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'admin/vendor-list',
    loadComponent: () =>
      import('./modules/admin/vendor-list/vendor-list.component').then(
        (m) => m.VendorListComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'add-vendor',
    loadComponent: () =>
      import('./modules/admin/add-vendor/add-vendor.component').then(
        (m) => m.AddVendorComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'edit-vendor/:id',
    loadComponent: () =>
      import('./modules/admin/edit-vendor/edit-vendor.component').then(
        (m) => m.EditVendorComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.default),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard-routing.module').then(
        (m) => m.default
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
