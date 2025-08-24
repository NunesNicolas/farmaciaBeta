import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpTokenService } from './auth/http-token.service';
import { UsersService } from './_services/users.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private authService: UsersService, private tSvc: HttpTokenService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      this.authService.getUser().subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
      });
    } else {
    }
    this.tSvc.getCrsfToken().subscribe();
  }
}
