import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { Routes } from '@angular/router';
import { MyCartComponent } from '../customer/my-cart/my-cart.component';
import { ProductListComponent } from '../products/product-list/product-list.component';

export default [
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'customer-home',
    component: CustomerHomeComponent,
    canActivate: [AuthGuard]
    , data: { roles: ['customer'] }
  },
  
  { path: 'products', component: ProductListComponent},
  { path: 'categories', component: CategoriesComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] , data: { roles: ['admin'] } },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'cart', component: MyCartComponent, canActivate: [AuthGuard], data: { roles: ['Customer'] } },
] as Routes;
