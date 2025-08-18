import { Routes } from '@angular/router';
import { ShowcaseComponent } from './pages/showcase/showcase.component';
import { InfoProductComponent } from './pages/info-product/info-product.component';
import {RegisterProductComponent} from './pages/register-product/register-product.component';




export const routes: Routes = [
      { path: '', component: ShowcaseComponent },
      { path: 'product/:id', component: InfoProductComponent },
      { path: 'register-product', component: RegisterProductComponent },
];


