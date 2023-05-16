import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/model/stock';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent {

  public stocks: Stock[] = [];
  constructor(private stockService: StockService, private authService: AuthService) { }

  ngOnInit() {
    this.fetchStocks();
  }

  fetchStocks() {
    this.stockService.getStocks()
      .subscribe(stocks => {
        this.stocks = stocks;
      });
  }

  setAuthToken() {
    this.authService.authToken = 'TESTING';
  }

  resetAuthToken() {
    this.authService.authToken = undefined;
  }

  makeFailingCall() {
    this.stockService.makeFailingCall().subscribe(
      (res) => console.log('Successfully made failing call', res),
      (err) => console.error('Error making failing call', err));
  }

}
