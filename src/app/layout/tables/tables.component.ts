import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AdminService } from '../../shared/services/admin/admin.service'
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

    constructor(private adminService:AdminService) {
    	this.users=[];
    	this.usersDataBackup=[];
    }
    check(i){
    	if(i>this.listIndex*this.listSize){
    	return false;
    	}else{
    		return true;
    	}
    }

    ngOnInit() {
    	this.adminService.getUserDetail().subscribe((data)=>{
    		if(data.response){
	    		this.usersDataBackup=data.data
	    		for (var i = 0; i<this.usersDataBackup.length; i++) {
	    			if (this.usersDataBackup[i].status=='active') {
	    				this.usersDataBackup[i].status=true
	    			}else{
	    				this.usersDataBackup[i].status=false
	    			}
	    		}
	    		for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.usersDataBackup[i])
	         	}
    		}else{
    			alert(data.message)
    		}
    	})
    }
    pageoption(event){
    	this.pageSize=event.pageSize
    	this.pageIndex=event.pageIndex
    	this.users=[]
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
        	if(i==this.usersDataBackup.length){
        		break;
        	}
          this.users.push(this.usersDataBackup[i])
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
}
