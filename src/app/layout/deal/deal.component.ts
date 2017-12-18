import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AdminService } from '../../shared/services/admin/admin.service';
import { UserService }from '../../user.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Sort} from '@angular/material';
import { ENV } from '../../env'
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
  sortedData;
  sortedData1;
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
    check_img(img){
      if(img==null || img==''){
        return ENV.dealImg+'no_image.jpg'
      }
      return ENV.dealImg+img;
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
                     this.sortedData = this.deals.slice();

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
                     this.sortedData1 = this.dealsType2.slice();

                  }
                  // code...
                }
                console.log(JSON.stringify(this.dealsType2))
            }else{
                alert(data.message)
            }
        })
    }
    sortData(sort: Sort) {
    const data = this.deals.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'deal_title': return compare(a.deal_title, b.deal_title, isAsc);
        case 'deal_type': return compare(a.deal_type, b.deal_type, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'rsf': return compare(a.rsf, b.rsf, isAsc);
        case 'cap': return compare(a.cap, b.cap, isAsc);
        case 'grm': return compare(a.grm, b.grm, isAsc);
        case 'lot_size': return compare(a.lot_size, b.lot_size, isAsc);
        default: return 0;
      }
    });
  }
  sortData1(sort: Sort) {
    const data = this.dealsType2.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData1 = data;
      return;
    }

    this.sortedData1 = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'text': return compare(a.text, b.text, isAsc);
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
    	this.deals=[]
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
        	if(i==this.dealsDataBackup.length){
        		break;
        	}else{
              this.deals.push(this.dealsDataBackup[i])
              this.sortedData = this.deals.slice();
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
                     this.sortedData1 = this.dealsType2.slice();
            }
     }
     console.log(event)
    }
    onStatusChange(data){
    	console.log(data.id);
    	this.adminService.changeDealStatus(data.id).subscribe((data)=>{
    		if(data.response){
    		}else{
    			alert(data.message)
    		}
    	})
    }
    searchUser(pager,pager2){
      console.log(pager)
      console.log(pager2)
        // pager.pageIndex=0;
        this.dealsDataBackup=[];
        this.dealsDataBackup=this.dealsDataBackup1.filter( it => {
            let b = it.deal_title
            return b.toLowerCase().includes(this.searchInput.toLowerCase())
        });
        this.pageIndex=0;
        this.pageSize=10;
        this.deals=[];
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
            if(i==this.dealsDataBackup.length){break;
            }else{
              this.deals.push(this.dealsDataBackup[i])
              this.sortedData = this.deals.slice();
            }
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
                this.sortedData = this.deals.slice();
              }
            }
          }else{}
        })
      }
      this.input_value='';
    }

    deleteDeal(data){
      this.adminService.deleteDeal(data.id).subscribe((data)=>{
        if(data.response){
          if(this.dealsDataBackup.map(function (img) { return img.id; }).indexOf(data.data.id)!=-1){
            this.dealsDataBackup.splice(this.dealsDataBackup.map(function (img) { return img.id; }).indexOf(data.data.id),1);
          }
          if(this.dealsDataBackup1.map(function (img) { return img.id; }).indexOf(data.data.id)!=-1){
            this.dealsDataBackup1.splice(this.dealsDataBackup1.map(function (img) { return img.id; }).indexOf(data.data.id),1);
          }
          if(this.dealsDataBackupType2.map(function (img) { return img.id; }).indexOf(data.data.id)!=-1){
            this.dealsDataBackupType2.splice(this.dealsDataBackupType2.map(function (img) { return img.id; }).indexOf(data.data.id),1);
          }
          if(this.dealsDataBackup1Type2.map(function (img) { return img.id; }).indexOf(data.data.id)!=-1){
            this.dealsDataBackup1Type2.splice(this.dealsDataBackup1Type2.map(function (img) { return img.id; }).indexOf(data.data.id),1);
          }
          if(this.deals.map(function (img) { return img.id; }).indexOf(data.data.id)!=-1){
            this.deals.splice(this.deals.map(function (img) { return img.id; }).indexOf(data.data.id),1);
            this.sortedData = this.deals.slice();
          }
          if(this.dealsType2.map(function (img) { return img.id; }).indexOf(data.data.id)!=-1){
            this.dealsType2.splice(this.dealsType2.map(function (img) { return img.id; }).indexOf(data.data.id),1);
                     this.sortedData1 = this.dealsType2.slice();
          }
        }else{
        }
      })
    }
    openConfirm(deal){
      let confirm = this.dialog.open(Confirm, {
        width: '300px',
        height: '200px',
      });

    confirm.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result=='yes'){
        this.deleteDeal(deal);
      }
    });
    }
    openDialog(deal){
       let dialogRef = this.dialog.open(DealDetails, {
      width: '1000px',
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
   deal
    
  constructor(
    public dialogRef: MatDialogRef<DealDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private adminService: AdminService,
        public dialog: MatDialog) {
    this.deal=this.data.deal
       }
  openDoc(link){
    window.open(ENV.dealDoc+link);
  }
  openImage(link){
    window.open(ENV.dealImg+link);
  }
  onYesClick(): void {
    this.dialogRef.close(this.data.deal);
    // this.homePage.onDelete(this.data.admin)
  }
   onNoClick(): void {
    this.dialogRef.close();
  }
  onClosed(){
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
@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm.html',
  providers: [AdminService]
})
export class Confirm {
  constructor(
    public confirm: MatDialogRef<Confirm>,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private adminService: AdminService,
        public dialog: MatDialog) {
       }
  onYesClick(): void {
    this.confirm.close('yes');
  }
   onNoClick(): void {
    this.confirm.close('no');
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}