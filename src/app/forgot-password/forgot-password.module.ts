import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AdminService } from '../shared/services/admin/admin.service'
@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    ToastModule.forRoot()
  ],
  declarations: [ForgotPasswordComponent],
  providers:[AdminService]
})
export class ForgotPasswordModule { }
