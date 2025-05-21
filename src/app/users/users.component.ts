import { Component, inject } from '@angular/core';
import { User } from '../interfaces/user.model';
import { UserService } from '../services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports:[NgxPaginationModule,CommonModule,RouterModule,FormsModule]
})

export class UsersComponent {

  private userService=inject(UserService)

  private router = inject(Router)
  
  users: User[] = [/* sample data */];
  searchTerm = '';
  currentPage = 1;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortField: keyof User = 'first_name';
  // router: any;

  ngOnInit(){
  
    this.userService.getUserList().subscribe({
      next: (data) => {
        this.users=data;
      },
      error: (err) => console.error('User details failed',err),


    });
  }


  // Poorva
  
  viewUser(user: User): void {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    this.router.navigate(['/users/{user.id}']);
  }
  // 


  get filteredUsers() {
    return this.users
      .filter(user =>
        user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const valA = a[this.sortField];
        const valB = b[this.sortField];
        return this.sortDirection === 'asc'
          ? (valA > valB ? 1 : -1)
          : (valA < valB ? 1 : -1);
      });
  }

  sort(field: keyof User) {
    this.sortDirection = this.sortField === field && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortField = field;
  }
}
