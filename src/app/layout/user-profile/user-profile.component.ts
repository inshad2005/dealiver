import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastsManager , Toast} from 'ng2-toastr';
import { UserService } from '../../user.service'
import { AdminService } from '../../shared/services/admin/admin.service';
import { ENV } from '../../env'
@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    animations: [routerTransition()]
})
export class UserProfileComponent implements OnInit {
	nonEditableStatus:boolean=true
    userData;
    image=ENV.imgApi+'no_image.jpg';
    imagechanged:boolean=false;
    imageType;
    oldPassword;
    oldPasswordCheck:boolean=true;
    newPassword;
    confirmPassword;
    confirmPasswordCheck:boolean=true;
    page='userDetailEdit';
    constructor(private adminService:AdminService,
                private userService:UserService,public toastr: ToastsManager, 
                 vcr: ViewContainerRef) {
                this.toastr.setRootViewContainerRef(vcr);
                this.userData={}
    }
    ngOnInit() {
        this.userData=this.userService.user.user;
        this.page=this.userService.user.actionFlag;
        this.image=ENV.imgApi+this.userService.user.user.image;
        console.log(this.userData)
    }
    getClass(i){
        if (i%2==0){
            return 'table-active'
        }else{
            return 'table-danger'
        }
    }
    onEdit(){
        this.nonEditableStatus=false
    }
    submit(){
        let data={
            id:this.userData.id,
            first_name:this.userData.first_name,
            last_name:this.userData.last_name,
            email:this.userData.email,
            phone_no:this.userData.phone_no,
            address:this.userData.address,
            image:this.imagechanged?this.image:null,
            imagetype:this.imagechanged?this.imageType:null,
        }
        this.adminService.updateUser(data)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
                this.toastr.info('Information updated successfully' ,'Success',{toastLife: 3000, showCloseButton: true});
                this.userService.user.user=data.data;
                this.userData=data.data;
            }else{
               this.toastr.error('Something went wrong, Please try again' ,'Error',{toastLife: 3000, showCloseButton: true});
            }
        })
        this.nonEditableStatus=true
        this.imagechanged=false;
    }
    onUploadImage(event){
        let a = event.target.value.split('.');
        this.imageType = a[a.length-1]
        if (!event.target){return;}
        if (!event.target.files){return;}
        if (event.target.files.length !== 1){return;}
        const file = event.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg')
            {return;}
        const fr = new FileReader();
        fr.onloadend = (loadEvent) =>
        {   
            this.image = fr.result;
            console.log(this.image)
        }
        fr.readAsDataURL(file);
        this.imagechanged=true;
    }
}