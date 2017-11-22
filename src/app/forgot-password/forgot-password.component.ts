import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { routerTransition } from '../router.animations';
import { ToastsManager , Toast} from 'ng2-toastr';
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
  constructor(private adminService:AdminService,public router: Router ,vcr: ViewContainerRef,public toastr: ToastsManager) {
                    this.toastr.setRootViewContainerRef(vcr);

  	this.email='';
  }

  ngOnInit() {
  }
  forgot(){
  	this.adminService.forgot({email:this.email})
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
              this.toastr.success( data.message ,'Authentication',{toastLife: 3000, showCloseButton: true})
              setTimeout(()=>{
				           this.router.navigate(['/login']);
              },3000)
            //	alert(data.message)
            }else if (data.message=='Email not found in database') {
               this.toastr.error('Please insert your register Email' ,'Authentication Failed ',{toastLife: 3000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Authentication Failed ',{toastLife: 3000, showCloseButton: true});
            }
        })
  }
}
