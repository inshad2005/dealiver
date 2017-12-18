import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AdminService } from '../../shared/services/admin/admin.service'
import { UserService }from '../../user.service'
import {Sort} from '@angular/material';
@Component({
    selector: 'app-dealtype',
    templateUrl: './dealtype.component.html',
    styleUrls: ['./dealtype.component.scss'],
    animations: [routerTransition()]
})
export class DealtypeComponent implements OnInit {
	usersDataBackup
	pageEvent;
	users=[];
	listIndex=1;
	listSize=10
	pageIndex=0;  
	pageSize=5;
  searchInput;
  usersDataBackup1;
  edit_type=0;
  input_value='';
  add_new:boolean=false;
  new_type_value='';
  sortedData;
    constructor(
        private adminService:AdminService,
        public router: Router,
        private userService:UserService
        ) {
    	this.users=[];
    	this.usersDataBackup=[];
    }

    ngOnInit() {
        this.adminService.getDealTypes().subscribe((data)=>{
            if(data.response){
                this.usersDataBackup=data.data
                this.usersDataBackup1=data.data
                for (var i = 0; i<this.usersDataBackup.length; i++) {
                    if (this.usersDataBackup[i].status=='active') {
                        this.usersDataBackup[i].status=true
                    }else{
                        this.usersDataBackup[i].status=false
                    }
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.usersDataBackup[i])
                 this.sortedData = this.users.slice();
                }
            }else{
                alert(data.message)
            }
        })
    }
    sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'type_name': return compare(a.type_name, b.type_name, isAsc);
        default: return 0;
      }
    });
  }
    check(i){
    	if(i>this.listIndex*this.listSize){
    	return false;
    	}else{
    		return true;
    	}
    }
    pageoption(event){
    	this.pageSize=event.pageSize
    	this.pageIndex=event.pageIndex
    	this.users=[]
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
        	if(i==this.usersDataBackup.length){
        		break;
        	}else{
              this.users.push(this.usersDataBackup[i])
              this.sortedData = this.users.slice();

            }
	   }
     console.log(event)
    }
    onStatusChange(data){
    	console.log(data.id);
    	this.adminService.changeDealtypeStatus(data.id).subscribe((data)=>{
    		if(data.response){
    		}else{
    			alert(data.message)
    		}
    	})
    }
    searchUser(pager){
        pager.pageIndex=0;
        this.usersDataBackup=[];
        this.usersDataBackup=this.usersDataBackup1.filter( it => {
            let b = it.type_name
            return b.toLowerCase().includes(this.searchInput.toLowerCase())
        });
        this.pageIndex=0;
        this.pageSize=10;
        this.users=[];
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
            if(i==this.usersDataBackup.length){break;
            }else{
              this.users.push(this.usersDataBackup[i])
              this.sortedData = this.users.slice();
            }
            if(this.usersDataBackup.length-1<i+1){break;}
        }
    }
    getClass(i){
    	if (i%2==0){
    		return 'table-danger'
    	}else{
    		return 'table-active'
    	}
    }
    getStatus(data){
    	if(data=='active'){
    		return true
    	}else{
    		return false
    	}
    }
    onUserEdit(deal_type){
     this.userService.user.user=deal_type;
     this.userService.user.actionFlag="deal_type";
     this.router.navigate(['/user-profile'])
    }
    createdealtype(pager){
      this.adminService.createdealtype({type_name:this.new_type_value}).subscribe(data=>{
        if(data.response){
          this.usersDataBackup1;
          this.users=[];
          this.sortedData = []
          this.usersDataBackup=[];
          this.pageIndex=0;  
          this.pageSize=5;
          pager.pageIndex=0;
          this.new_type_value='';
          this.ngOnInit();
        }
        else{

        }
      })
    }
    check_valid(){
      if(this.new_type_value==''){
        return true
      }
      else{
        return false;
      }
    }
    updateDeal(input_value,user_id){
      console.log(input_value,user_id)
      if(input_value!='' && input_value!=null){
        this.adminService.updateDealType({value:input_value,id:user_id}).subscribe((data)=>{
          if(data.response){
            for(let i=0;i<this.usersDataBackup.length;i++){
              if(this.usersDataBackup[i].id==data.data.id){
                this.usersDataBackup[i].type_name=data.data.type_name
              }
            }
            for(let i=0;i<this.usersDataBackup1.length;i++){
              if(this.usersDataBackup1[i].id==data.data.id){
                this.usersDataBackup1[i].type_name=data.data.type_name
              }
            }
            for(let i=0;i<this.users.length;i++){
              if(this.users[i].id==data.data.id){
                this.users[i].type_name=data.data.type_name;
                this.sortedData = this.users.slice();
              }
            }
          }else{}
        })
      }
      this.input_value='';
    }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}