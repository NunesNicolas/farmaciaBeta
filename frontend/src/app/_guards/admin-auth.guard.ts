import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UsersService } from '../_services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // First check localStorage for quick access
    const userRole = localStorage.getItem('userRole');
    
    if (userRole === 'admin') {
      return true;
    }
    
    // If not in localStorage, check with backend
    return this.usersService.getUser().pipe(
      map(userData => {
        if (userData && userData.role === 'admin') {
          // Update localStorage with correct role
          localStorage.setItem('userRole', userData.role);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
