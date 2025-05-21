import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http=inject(HttpClient)
  constructor() {

  }

  getUserList(){
    return this.http.get<User[]>('https://d2k-static-assets.s3.ap-south-1.amazonaws.com/assignment-files/python-backend-assignment/users.json');
  }
  
}
