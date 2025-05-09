import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { AuthGuard } from '../../core/guards/auth.guard'; // Import the guard
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { Routes } from '@angular/router';

export default [
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-home',
    component: CustomerHomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'products', component: ProductsComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] }
] as Routes;
