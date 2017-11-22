import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AdminService } from '../shared/services/admin/admin.service'
@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule
  ],
  declarations: [ForgotPasswordComponent],
  providers:[AdminService]
})
export class ForgotPasswordModule { }
