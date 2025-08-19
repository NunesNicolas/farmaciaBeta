import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpTokenService } from '../../auth/http-token.service';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user = {name: 'No Login', role: null};
  isAdmin = false;

  constructor(
    private router: Router,
    private httpTokenService: HttpTokenService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.usersService.getUser().subscribe({
      next: (userData) => {
        if (userData) {
          this.user = {
            name: userData.name || 'User',
            role: userData.category || null
          };
          this.isAdmin = userData.category == 'admin';
          
          // Store user role in localStorage for guard
          localStorage.setItem('userRole', userData.category || '');
        }
      },
      error: (error) => {
        console.error('Error loading user info:', error);
        this.user = {name: 'No Login', role: null};
        this.isAdmin = false;
      }
    });
  }

  logout() {
    this.usersService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        this.router.navigate(['/login']);
      }
    });
  }

  navigateToProductRegister() {
    this.router.navigate(['/registerproduct']);
  }
}
