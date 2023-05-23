import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stocks/list', component: StockListComponent, canActivate: [authGuard] },
  { path: 'stocks/create', component: CreateStockComponent, canActivate: [authGuard] },
  { path: 'stock/:code', component: StockDetailsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/register' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
