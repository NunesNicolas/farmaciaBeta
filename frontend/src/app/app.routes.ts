import { Routes } from '@angular/router';
import { ShowcaseComponent } from './pages/showcase/showcase.component';
import { InfoProductComponent } from './pages/info-product/info-product.component';
import {RegisterProductComponent} from './pages/register-product/register-product.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminAuthGuard } from './_guards/admin-auth.guard';





export const routes: Routes = [
      { path: '', component: ShowcaseComponent },
      { path: 'product/:id', component: InfoProductComponent },
      { path: 'registerproduct', component: RegisterProductComponent, canActivate: [AdminAuthGuard] },
      { path: 'login', component: LoginComponent }
];


