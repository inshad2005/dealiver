import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { DealRoutingModule } from './deal-routing.module';
import { DealComponent,DealDetails,Confirm } from './deal.component';
import { PageHeaderModule } from './../../shared';
import { AdminService } from '../../shared/services/admin/admin.service'
import { MatPaginatorModule,MatDialogModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
@NgModule({
    imports: [CommonModule, DealRoutingModule, PageHeaderModule, FormsModule, MatPaginatorModule,MatDialogModule,MatSortModule],
    declarations: [DealComponent,DealDetails,Confirm],
    entryComponents:[DealDetails,Confirm],
    providers:[AdminService]
})
export class DealModule {}
