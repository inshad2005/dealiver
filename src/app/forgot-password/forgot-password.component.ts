import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AdminService } from '../shared/services/admin/admin.service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {
	email;
  constructor(private adminService:AdminService,public router: Router) {

  	this.email='';
  }

  ngOnInit() {
  }
  forgot(){
  	this.adminService.forgot({email:this.email})
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
				this.router.navigate(['/dashboard']);
            	alert(data.message)
            }else{
                alert(data.message);
            }
        })
  }
}
