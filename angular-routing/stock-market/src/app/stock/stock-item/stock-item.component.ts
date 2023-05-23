import { Component, Input} from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent {
  @Input() public stock: Stock | undefined;

  constructor(private stockService: StockService) { }

  onToggleFavorite(event: any) {
    if (this.stock) {
      this.stockService.toggleFavorite(this.stock)
        .subscribe(
          (stock) => {
            if (this.stock) {
              this.stock.favorite = !this.stock.favorite
            }
          })
    };
  }

}
