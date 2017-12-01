import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { DealtypeRoutingModule } from './dealtype-routing.module';
import { DealtypeComponent } from './dealtype.component';
import { PageHeaderModule } from './../../shared';
import { AdminService } from '../../shared/services/admin/admin.service'
import { MatPaginatorModule } from '@angular/material';
@NgModule({
    imports: [CommonModule, DealtypeRoutingModule, PageHeaderModule, FormsModule, MatPaginatorModule],
    declarations: [DealtypeComponent],
    providers:[AdminService]
})
export class DealtypeModule {}
