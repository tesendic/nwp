import { Component } from '@angular/core';
import { Stock } from './model/stock';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';

@Component({
  selector: 'app-root',
  imports: [StockItemComponent, CreateStockComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stock market';
  public stock = new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ');

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stock.favorite = !this.stock.favorite;
  }
}
