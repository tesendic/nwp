import { Component } from '@angular/core';
import { Stock } from '../../model/stock';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stock-item',
  imports: [CurrencyPipe],
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent {
  public stock = new Stock('Test Stock Company', 'TSC', 85, 80);

  constructor() { }

  toggleFavorite(event: any) {
    console.log('We are toggling the favorite state for this stock', event);
    this.stock.favorite = !this.stock.favorite;
  }

}
