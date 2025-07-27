import { Component } from '@angular/core';
import { Stock } from './model/stock';
import { MessageService } from './services/message.service';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';

@Component({
  selector: 'app-root',
  imports: [CreateStockComponent, StockListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stock market';

  constructor(public messageService: MessageService) { }
  
  ngOnInit(): void {
    this.messageService.message = 'Hello Message Service!';
  }

}
