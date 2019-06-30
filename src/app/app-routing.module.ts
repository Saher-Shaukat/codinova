import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsContainer } from './containers/products/products.container';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ProductsContainer },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
