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
    
  }

  onSubmit() {
    this.clearErrors();
    this.isLoading = true;
    this.errorMessage = '';

    if (!this.email) {
      this.emailError = 'Email é obrigatório';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = 'Email inválido';
    }

    if (!this.password) {
      this.passwordError = 'Senha é obrigatória';
    } else if (this.password.length < 6) {
      this.passwordError = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (this.emailError || this.passwordError) {
      this.isLoading = false;
      return;
    }

    this.httpTokenService.getCrsfToken().subscribe({
      next: () => {
        this.usersService.login({
          email: this.email,
          password: this.password
        }).subscribe({
          next: (response) => {
            this.isLoading = false;
            
             window.location.href = '/';
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Login error:', error);
            
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
