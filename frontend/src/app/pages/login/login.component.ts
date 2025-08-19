import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { HttpTokenService } from '../../auth/http-token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private usersService: UsersService,
    private httpTokenService: HttpTokenService,
    private router: Router
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    // First, get the CSRF token
    this.httpTokenService.getCrsfToken().subscribe({
      next: () => {
        // Then attempt login
        this.usersService.login({
          email: this.email,
          password: this.password
        }).subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log('Login successful:', response);
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.error?.message || 'Erro ao fazer login. Verifique suas credenciais.';
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao obter token de segurança. Tente novamente.';
      }
    });
  }
}
