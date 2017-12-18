import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutusComponent } from './aboutus.component';
import { PageHeaderModule } from './../../shared';
import { AdminService } from '../../shared/services/admin/admin.service'
import { MatPaginatorModule } from '@angular/material';
@NgModule({
    imports: [CommonModule, AboutusRoutingModule, PageHeaderModule, FormsModule, MatPaginatorModule],
    declarations: [AboutusComponent],
    providers:[AdminService]
})
export class AboutusModule {}
