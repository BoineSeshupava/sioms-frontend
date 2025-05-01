import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { AuthGuard } from '../../core/guards/auth.guard'; // Import the guard

const routes: Routes = [
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-home',
    component: CustomerHomeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
