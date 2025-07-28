import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Stock } from '../../model/stock';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stock-item',
  imports: [RouterModule],
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent {
  @Input() public stock: Stock | undefined;
  @Output() private toggleFavorite: EventEmitter<Stock> = new EventEmitter<Stock>();

  constructor() { }

  onToggleFavorite(event: any) {
    event.stopPropagation();    //stop propagation of event because of routerLink in parent element
    this.toggleFavorite.emit(this.stock);
  }

}
