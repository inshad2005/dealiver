import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {User} from './userdata';
@Injectable()
export class UserService {
  user:User;
  constructor() {
  	this.user = new User();   
  }
  deleteData(){
  	this.user = null;
  	this.user = new User();
  }
}