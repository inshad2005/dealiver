import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {AdminService} from '../shared/services/admin/admin.service'

@NgModule({
    imports: [CommonModule, LoginRoutingModule,FormsModule],
    declarations: [LoginComponent],
    providers:[AdminService]
})
export class LoginModule {}
