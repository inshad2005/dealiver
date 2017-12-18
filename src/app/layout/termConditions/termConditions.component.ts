import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AdminService } from '../../shared/services/admin/admin.service'
import { UserService }from '../../user.service'
@Component({
    selector: 'app-termConditions',
    templateUrl: './termConditions.component.html',
    styleUrls: ['./termConditions.component.scss'],
    animations: [routerTransition()]
})
export class TermConditionsComponent implements OnInit {
    data
    enable:boolean=true;
    constructor(
        private adminService:AdminService,
        public router: Router,
        private userService:UserService
        ) {
      this.data={};
      this.data.description='';
    }

    ngOnInit() {
        this.adminService.termAndCondition().subscribe(data=>{
          if(data.response){
            this.data=data.data
          }
        },err=>{

        })
    }
    save(){
      this.enable=true;
      this.adminService.updateTermAndCondition({description:this.data.description}).subscribe(data=>{
      },err=>{
      })
    }
}
