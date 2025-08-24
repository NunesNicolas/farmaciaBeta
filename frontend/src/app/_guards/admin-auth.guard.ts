import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    const userRole = localStorage.getItem('userRole');
    
    if (userRole === 'admin') {
      return true;
    }
    
    return this.usersService.getUser().pipe(
      map(userData => {
        if (userData && userData.category === 'admin') {
          localStorage.setItem('userRole', userData.category);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
