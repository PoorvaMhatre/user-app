import { Component } from '@angular/core';
import { User } from '../interfaces/user.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-detail',
  imports: [NgxPaginationModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  user?: User;

  users: User[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('selectedUser');
      this.user = storedUser ? JSON.parse(storedUser) : null;
    }

  goBack(): void {
      this.router.navigate(['/users']);
    }

}
