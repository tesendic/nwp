import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../../model/stock';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stock-item',
  imports: [CurrencyPipe],
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent {
  @Input() public stock: Stock | undefined;
  @Output() private toggleFavorite: EventEmitter<Stock> = new EventEmitter<Stock>();

  constructor() { }

  onToggleFavorite(event: any) {
    this.toggleFavorite.emit(this.stock);
  }

}
