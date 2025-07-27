import { Component, Input} from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stock-item',
  imports: [RouterModule],
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
