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
        // Then attempt login with proper confirmation
        this.usersService.login({
          email: this.email,
          password: this.password
        }).subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log('Login successful:', response);
            
            // Only navigate after successful confirmation
            if (response && response.status !== 'error') {
              this.router.navigate(['/']);
            } else {
              this.errorMessage = response.message || 'Login falhou. Por favor, verifique suas credenciais.';
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Login error:', error);
            
            // Handle different error types
            if (error.status === 422) {
              this.errorMessage = 'Credenciais inválidas. Por favor, verifique seu email e senha.';
            } else if (error.status === 401) {
              this.errorMessage = 'Email ou senha incorretos.';
            } else if (error.error?.message) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais e tente novamente.';
            }
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('CSRF token error:', error);
        this.errorMessage = 'Erro ao obter token de segurança. Tente novamente.';
      }
    });
  }
}
