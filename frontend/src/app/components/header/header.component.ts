import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpTokenService } from '../../auth/http-token.service';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : { name: 'No Login', role: null };
  isAdmin = false;
  isDropdownOpen = false;

  constructor(
    private router: Router,
    private httpTokenService: HttpTokenService,
    private usersService: UsersService
  ) { }

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
          this.isAdmin = userData.category === 'admin';
          localStorage.setItem('user', JSON.stringify(userData));
          if (userData.category) {
            localStorage.setItem('userRole', userData.category);
          }
        }
      },
      error: () => {
        this.user = { name: 'No Login', role: null };
        this.isAdmin = false;
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
      }
    });
  }

  logout() {
    this.usersService.logout().subscribe({
      next: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        this.router.navigate(['/login']);
      }
    });
  }

  navigateToProductRegister() {
    this.router.navigate(['/registerproduct']);
    this.closeDropdown();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}