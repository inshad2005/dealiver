import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { routerTransition } from '../router.animations';
import {AdminService} from '../shared/services/admin/admin.service'
import { UserService }from '../user.service'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginModel
    complexForm: FormGroup;
    constructor(public router: Router,
                private adminService:AdminService,
                private fb: FormBuilder,
                private userService:UserService) {
        this.loginModel={}
        
    }

    ngOnInit() {
     // this.adminService.onGetAdmin()
     // .subscribe(data=>{
     //   console.log('ints')
     //   //console.log(JSON.stringify(data))
     // },error=>{
       
     //  //this.toastr.error( 'Something went worng please try again after some time !!','Authentication failed. ',{toastLife: 3000, showCloseButton: true});
     // })
    }

    onLoggedin() {
        console.log(JSON.stringify(this.loginModel))
        this.adminService.login(this.loginModel)
        .subscribe(data=>{
            if(data.response){
                localStorage.setItem('isLoggedin', 'true');
                localStorage['user'] = JSON.stringify(data.data);
                this.userService.user = data.data;
                this.router.navigate(['/dashboard']);
            }else{
                alert('something wrong')
            }
        })
    }
}
