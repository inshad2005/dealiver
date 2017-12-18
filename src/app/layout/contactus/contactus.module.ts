import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ContactusRoutingModule } from './contactus-routing.module';
import { ContactusComponent } from './contactus.component';
import { PageHeaderModule } from './../../shared';
import { AdminService } from '../../shared/services/admin/admin.service'
import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material';
@NgModule({
    imports: [CommonModule, ContactusRoutingModule, PageHeaderModule, FormsModule, MatPaginatorModule,MatSortModule],
    declarations: [ContactusComponent],
    providers:[AdminService]
})
export class ContactusModule {}
