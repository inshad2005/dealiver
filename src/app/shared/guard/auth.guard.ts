import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../user.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,private userService:UserService) {}

    canActivate() {
    	let data = localStorage['user'];
        	this.userService.user=JSON.parse(data);
        if (localStorage.getItem('isLoggedin')) {
        	
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
