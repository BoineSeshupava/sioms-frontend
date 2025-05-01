// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule, NavbarComponent], // ✅ Import, not declare
  exports: [NavbarComponent]
})
export class SharedModule {}
