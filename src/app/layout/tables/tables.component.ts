import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AdminService } from '../../shared/services/admin/admin.service'
import { UserService }from '../../user.service'
import {Sort} from '@angular/material';
@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
	usersDataBackup
	pageEvent;
	users=[];
	listIndex=1;
	listSize=10
	pageIndex=0  
	pageSize=10
    searchInput;
    usersDataBackup1;
    sortedData

    constructor(
        private adminService:AdminService,
        public router: Router,
        private userService:UserService
        ) {
    	this.users=[];
    	this.usersDataBackup=[];
    }

    ngOnInit() {
        this.adminService.getUserDetail().subscribe((data)=>{
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
        case 'first_name': return compare(a.first_name, b.first_name, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'phone_no': return compare(a.phone_no, b.phone_no, isAsc);
        case 'pref_name': return compare(a.pref_name, b.pref_name, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
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
    	this.adminService.changeUserStatus(data.id).subscribe((data)=>{
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
            let b = it.first_name+' '+it.last_name
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
    // onsearchuser(){
      // let searchData=this.searchInput.trim()
      // let searchArray=searchData
      // console.log(searchArray)
      // if (searchArray.legth==1) {
      //    if (searchData == '') {
      //         this.users = this.usersDataBackup;
      //         return;
      //    }
      //    let ev= searchData
      //    if (ev && ev.trim() != '') {
      //     this.users = this.usersDataBackup.filter((value) => {
      //         return (value.first_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.last_name.toUpperCase().indexOf(ev.toUpperCase()) > -1);
           
      //    })
      //   }
      // }
      //else{
      //      if (searchData == '') {
      //         this.users = this.usersDataBackup;
      //         return;
      //    }
      //    let ev  = searchArray[0]
      //    let ev2 = searchArray[1]
      //    if (ev && ev.trim() != '' || ev2 && ev2.trim() != '') {
      //     this.users = this.usersDataBackup.filter((value) => {
      //         return (value.first_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.last_name.toUpperCase().indexOf(ev2.toUpperCase()) > -1);
           
      //    })
      //   }
      // }
  // }
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

    onUserDetails(user){
     this.userService.user.user=user;
     this.userService.user.actionFlag="userDetail";
     this.router.navigate(['/user-profile'])
    }
    onUserEdit(user){
     this.userService.user.user=user;
     this.userService.user.actionFlag="userDetailEdit";
     this.router.navigate(['/user-profile'])
    }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}