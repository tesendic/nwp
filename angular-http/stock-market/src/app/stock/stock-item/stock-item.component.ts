import { ChangeDetectorRef, Component, Input} from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stock-item',
  imports: [CurrencyPipe],
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent {
  @Input() public stock: Stock | undefined;

  constructor(private stockService: StockService, private cdr: ChangeDetectorRef) { }

  onToggleFavorite(event: any) {
    if (this.stock) {
      this.stockService.toggleFavorite(this.stock)
        .subscribe(
          (stock) => {
            if (this.stock) {
              this.stock.favorite = !this.stock.favorite
              //this.stock = {...this.stock}
              //this.cdr.detectChanges();
            }
          })
    };
  }

}
