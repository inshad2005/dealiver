import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealtypeComponent } from './dealtype.component';

const routes: Routes = [
    {
        path: '', component: DealtypeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DealtypeRoutingModule {
}
