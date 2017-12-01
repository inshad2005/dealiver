import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AdminService } from '../../shared/services/admin/admin.service'
import { UserService }from '../../user.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-deal',
    templateUrl: './deal.component.html',
    styleUrls: ['./deal.component.scss'],
    animations: [routerTransition()]
})
export class DealComponent implements OnInit {
	dealsDataBackup
	pageEvent;
	deals=[];
  dealsType2=[];
	listIndex=1;
	listSize=10
	pageIndex=0;  
	pageSize=5;
  listIndex2=1;
  listSize2=10
  pageIndex2=0;  
  pageSize2=5;
  searchInput;
  dealsDataBackup1;
  dealsDataBackupType2
  dealsDataBackup1Type2
  edit_type=0;
  input_value='';
  add_new:boolean=false;
  new_type_value='';
  table:boolean=true;
    constructor(
        private adminService:AdminService,
        public router: Router,
        private userService:UserService,
         public dialog: MatDialog
        ) {
    	this.deals=[];
    	this.dealsDataBackup=[];
      this.dealsDataBackupType2=[];
    }
    table_toggele(){
      this.table=!this.table;
    }
    ngOnInit() {
        this.adminService.getDeal().subscribe((data)=>{
            if(data.response){
                this.dealsDataBackup=data.data.filter(arg=>arg.post_type==1)
                this.dealsDataBackup1=data.data.filter(arg=>arg.post_type==1)
                this.dealsDataBackupType2=data.data.filter(arg=>arg.post_type==2)
                this.dealsDataBackup1Type2=data.data.filter(arg=>arg.post_type==2)
                console.log(this.dealsDataBackupType2.length)
                console.log(this.dealsDataBackup.length)
                for (var i = 0; i<this.dealsDataBackup.length; i++) {
                    if (this.dealsDataBackup[i].status=='active') {
                        this.dealsDataBackup[i].status=true
                    }else{
                        this.dealsDataBackup[i].status=false
                    }
                }
                if (this.dealsDataBackup.length>0) {
                     for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                    this.deals.push(this.dealsDataBackup[i])
                  }
                }
               

                 for (var i = 0; i<this.dealsDataBackupType2.length; i++) {
                    if (this.dealsDataBackupType2[i].status=='active') {
                        this.dealsDataBackupType2[i].status=true
                    }else{
                        this.dealsDataBackupType2[i].status=false
                    }
                }
                if (this.dealsDataBackupType2.length>0) {
                  for (var i = this.pageIndex2*this.pageSize2; i<(this.pageIndex2*this.pageSize2+this.pageSize2); i++) {
                   this.dealsType2.push(this.dealsDataBackupType2[i])
                  }
                  // code...
                }
                console.log(JSON.stringify(this.dealsType2))
            }else{
                alert(data.message)
            }
        })
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
    	this.deals=[]
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
        	if(i==this.dealsDataBackup.length){
        		break;
        	}else{
              this.deals.push(this.dealsDataBackup[i])
            }
	   }
     console.log(event)
    }
    pageoption2(event){
      this.pageSize2=event.pageSize
      this.pageIndex2=event.pageIndex
      this.dealsType2=[]
        for (var i = this.pageIndex2*this.pageSize2; i<(this.pageIndex2*this.pageSize2+this.pageSize2); i++) {
          if(i==this.dealsDataBackupType2.length){
            break;
          }else{
              this.dealsType2.push(this.dealsDataBackupType2[i])
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
        this.dealsDataBackup=[];
        this.dealsDataBackup=this.dealsDataBackup1.filter( it => {
            let b = it.type_name
            return b.toLowerCase().includes(this.searchInput.toLowerCase())
        });
        this.pageIndex=0;
        this.pageSize=10;
        this.deals=[];
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
            if(i==this.dealsDataBackup.length){break;
            }else{this.deals.push(this.dealsDataBackup[i])}
            if(this.dealsDataBackup.length-1<i+1){break;}
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
            for(let i=0;i<this.dealsDataBackup.length;i++){
              if(this.dealsDataBackup[i].id==data.data.id){
                this.dealsDataBackup[i].type_name=data.data.type_name
              }
            }
            for(let i=0;i<this.dealsDataBackup1.length;i++){
              if(this.dealsDataBackup1[i].id==data.data.id){
                this.dealsDataBackup1[i].type_name=data.data.type_name
              }
            }
            for(let i=0;i<this.deals.length;i++){
              if(this.deals[i].id==data.data.id){
                this.deals[i].type_name=data.data.type_name
              }
            }
          }else{}
        })
      }
      this.input_value='';
    }

    openDialog(deal){
       let dialogRef = this.dialog.open(DealDetails, {
      width: '1200px',
      data: { deal: deal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // alert('closed')
      // alert(JSON.stringify(result))
      if (result) {
          // code...
       // this.onDelete(result)
      }
     // this.animal = result;
    });
    }
}
@Component({
  selector: 'deal-details-dialog',
  templateUrl: 'deal-details.html',
  providers: [AdminService]
})

export class DealDetails {
   

  constructor(
    public dialogRef: MatDialogRef<DealDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private adminService: AdminService,
        public dialog: MatDialog) {
       }

  onYesClick(): void {
    this.dialogRef.close(this.data.admin);
    // this.homePage.onDelete(this.data.admin)
  }
   onNoClick(): void {
    this.dialogRef.close();
  }
    getClass(i){
        if (i%2==0){
            return 'table-active'
        }else{
            return 'table-danger'
        }
    }

 

}