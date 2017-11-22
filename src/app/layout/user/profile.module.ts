import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PageHeaderModule } from './../../shared';
import { AdminService } from '../../shared/services/admin/admin.service'

@NgModule({
    imports: [CommonModule, ProfileRoutingModule, PageHeaderModule,FormsModule],
    declarations: [ProfileComponent],
    providers: [AdminService]
})
export class ProfileModule {}
