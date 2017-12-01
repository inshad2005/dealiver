import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../user.service'
import { AdminService } from '../../shared/services/admin/admin.service';
import { ENV } from '../../env'
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
	nonEditableStatus:boolean=true
    userData;
    image='assets/images/400x400.png';
    imagechanged:boolean=false;
    imageType;
    oldPassword;
    oldPasswordCheck:boolean=true;
    newPassword;
    confirmPassword;
    confirmPasswordCheck:boolean=true;
    constructor(private adminService:AdminService,
                private userService:UserService) {
        this.userData={}
    }

    ngOnInit() {
        this.userData=this.userService.user;
        this.image=ENV.mainApi+'/www/images/'+this.userService.user.admin.image;
        console.log(this.userData)
    }
    onStatusChange(){}
    onEdit(){
        this.nonEditableStatus=false
    }
    changePassword(event){
        let data={
            id:this.userData.id,
            password:this.confirmPassword
        }
        this.adminService.updateProfile(data,1)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
                this.userService.user=data.data;
                this.userData=this.userService.user;
            }else{
                alert('sonmthing wrong')
            }
        })
        this.confirmPasswordCheck=true;
        this.oldPasswordCheck=true;
        event.reset();
        this.oldPassword=null;
        this.newPassword=null;
        this.confirmPassword=null;
    }
    submit(){
        let data={
            id:this.userData.id,
            first_name:this.userData.first_name,
            last_name:this.userData.last_name,
            username:this.userData.username,
            user_email:this.userData.user_email,
            image:this.imagechanged?this.image:null,
            imagetype:this.imagechanged?this.imageType:null,
        }
        this.adminService.updateProfile(data,0)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
                this.userService.user=data.data;
                this.userData=this.userService.user;
            }else{
                alert('sonmthing wrong')
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