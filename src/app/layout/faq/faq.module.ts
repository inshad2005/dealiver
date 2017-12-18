import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { PageHeaderModule } from './../../shared';
import { AdminService } from '../../shared/services/admin/admin.service'
import { MatPaginatorModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
@NgModule({
    imports: [CommonModule, FaqRoutingModule, PageHeaderModule, FormsModule, MatPaginatorModule,MatSortModule],
    declarations: [FaqComponent],
    providers:[AdminService]
})
export class FaqModule {}
