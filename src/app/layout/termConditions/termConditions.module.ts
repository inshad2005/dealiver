import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { TermConditionsRoutingModule } from './termConditions-routing.module';
import { TermConditionsComponent } from './termConditions.component';
import { PageHeaderModule } from './../../shared';
import { AdminService } from '../../shared/services/admin/admin.service'
import { MatPaginatorModule } from '@angular/material';
@NgModule({
    imports: [CommonModule, TermConditionsRoutingModule, PageHeaderModule, FormsModule, MatPaginatorModule],
    declarations: [TermConditionsComponent],
    providers:[AdminService]
})
export class TermConditionsModule {}
