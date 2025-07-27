import { Component } from '@angular/core';
import { StockItemComponent } from './stock/stock-item/stock-item.component';


@Component({
  selector: 'app-root',
  imports: [StockItemComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stock market';
}
