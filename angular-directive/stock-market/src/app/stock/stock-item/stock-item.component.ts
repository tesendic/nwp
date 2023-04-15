import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  public stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  stockClasses: any;
  stockStyles: any;
  stocks: Stock[] = [];

  constructor() { }

  ngOnInit() {
    let diff = (this.stock.price / this.stock.previousPrice) - 1;
    let largeChange = Math.abs(diff) > 0.01;
    this.stockClasses = {
      "positive": this.stock.isPositiveChange(),
      "negative": !this.stock.isPositiveChange(),
      "large-change": largeChange,
      "small-change": !largeChange
    };
    this.stockStyles = {
      "color": this.stock.isPositiveChange() ? "green" : "red",
      "font-size": largeChange ? "1.2em" : "0.8em"
    };
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80),
      new Stock('Second Stock Company', 'SSC', 10, 20),
      new Stock('Last Stock Company', 'LSC', 876, 765)
    ];
  }

  toggleFavorite(event: any) {
    console.log('We are toggling the favorite state for this stock', event);
    this.stock.favorite = !this.stock.favorite;
  }

  toggleFavoriteFor(event: any, index: number) {
    console.log('We are toggling the favorite state for stock', index, event);
    this.stocks[index].favorite = !this.stocks[index].favorite;
  }

}
