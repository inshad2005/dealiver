import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { PageHeaderModule } from './../../shared';
import { AdminService } from '../../shared/services/admin/admin.service'

@NgModule({
    imports: [CommonModule, UserProfileRoutingModule, PageHeaderModule,FormsModule],
    declarations: [UserProfileComponent],
    providers: [AdminService]
})
export class UserProfileModule {}
