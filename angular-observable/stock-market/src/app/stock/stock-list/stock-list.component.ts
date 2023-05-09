import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent {

  public stocks: Stock[] = [];
  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks()
      .subscribe(stocks => {
        this.stocks = stocks;
      });
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stockService.toggleFavorite(stock);
  }

}
