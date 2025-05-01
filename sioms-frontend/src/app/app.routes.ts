import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminHomeComponent } from './modules/dashboard/admin-home/admin-home.component';
import { CustomerHomeComponent } from './modules/dashboard/customer-home/customer-home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'customer', component: CustomerHomeComponent },
  { path: '**', component: PageNotFoundComponent }
];
