import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ToastsManager , Toast} from 'ng2-toastr';
import { UserService } from '../../user.service'
import { AdminService } from '../../shared/services/admin/admin.service'
import { forkJoin } from "rxjs/observable/forkJoin";
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    result
    user
deal
contactus
faq
    constructor(private userService:UserService,public toastr: ToastsManager, 
         vcr: ViewContainerRef,private adminService:AdminService,) {
        this.result={}
    //     forkJoin([this.adminService.getUserDetail(), this.adminService.getDeal(),this.adminService.getContactUs(),this.adminService.getFaq()]).subscribe(results => {
    //      this.result.user=results[0];
    //      this.result.deal=results[1]
    //      this.result.contactus=results[2]
    //      this.result.faq=results[3]
    // });
        this.toastr.setRootViewContainerRef(vcr);
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        forkJoin([this.adminService.getUserDetail(), this.adminService.getDeal(),this.adminService.getContactUs(),this.adminService.getFaq()]).subscribe(results => {
         this.user=results[0].data;
         this.deal=results[1].data
         this.contactus=results[2].data
         this.faq=results[3].data


        //alert(this.user.length)
    });
        
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
