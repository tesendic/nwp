import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent {

  public stock: Stock | undefined;
  constructor(private stockService: StockService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const stockCode = this.route.snapshot.paramMap.get('code');
    if (stockCode != null) {
      this.stockService.getStock(stockCode).subscribe(stock => this.stock = stock);
    }
  }
}
