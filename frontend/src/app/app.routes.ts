import { Routes } from '@angular/router';
import { ShowcaseComponent } from './pages/showcase/showcase.component';
import { InfoProductComponent } from './pages/info-product/info-product.component';
import {RegisterProductComponent} from './pages/register-product/register-product.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminAuthGuard } from './_guards/admin-auth.guard';
import { EditProductComponent } from './pages/edit-product/edit-product.component';





export const routes: Routes = [
      { path: '', component: ShowcaseComponent },
      { path: 'login', component: LoginComponent },

      { path: 'product/:id', component: InfoProductComponent },
      { path: 'registerproduct', component: RegisterProductComponent, canActivate: [AdminAuthGuard] },
      { path: 'product/:id/edit', component: EditProductComponent, canActivate: [AdminAuthGuard] },
];


