import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor(public router: Router) {}

    ngOnInit() {}
    onClick(label){
       // alert(label)
        if (label=='Users!') {
            // code...
            this.router.navigate(['/tables']);
        }else if (label=='Deals!') {
            // code...
            this.router.navigate(['/deal']);
        } else if (label=='Contact Us!') {
            // code...
            this.router.navigate(['/contactus']);
        } else if (label=='FAQ!') {
            // code...
            this.router.navigate(['/faq']);
        } 
    }
}
