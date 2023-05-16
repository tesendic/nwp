import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { FormsModule } from '@angular/forms';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StockAppInterceptor } from './services/stock-app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    CreateStockComponent,
    StockListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StockAppInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
