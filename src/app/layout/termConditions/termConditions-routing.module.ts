import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermConditionsComponent } from './termConditions.component';

const routes: Routes = [
    {
        path: '', component: TermConditionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TermConditionsRoutingModule {
}
