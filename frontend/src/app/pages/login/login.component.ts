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
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private usersService: UsersService,
    private httpTokenService: HttpTokenService,
    private router: Router
  ) {
    // Force page reload when accessing login page
    
  }

  onSubmit() {
    this.clearErrors();
    this.isLoading = true;
    this.errorMessage = '';

    // Validate email
    if (!this.email) {
      this.emailError = 'Email é obrigatório';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = 'Email inválido';
    }

    // Validate password
    if (!this.password) {
      this.passwordError = 'Senha é obrigatória';
    } else if (this.password.length < 6) {
      this.passwordError = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (this.emailError || this.passwordError) {
      this.isLoading = false;
      return;
    }

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
              // Force page reload to clear history
              window.location.href = '/';
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
            } else if (error.status === 429) {
              this.errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
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

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private clearErrors() {
    this.emailError = '';
    this.passwordError = '';
    this.errorMessage = '';
  }
}
