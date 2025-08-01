import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Stock } from '../../model/stock';
import { MessageService } from '../../services/message.service';
import { StockService } from '../../services/stock.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-create-stock',
  imports: [FormsModule, JsonPipe],
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css'],
  providers: [MessageService]
})
export class CreateStockComponent {

  public stock: Stock;
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];

  constructor(private stockService: StockService, public messageService: MessageService) {
    this.stock = new Stock('', '', 0, 0, 'NASDAQ');
    this.messageService.message = 'Component Level: Hello Message Service';
  }

  setStockPrice(price: number) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm: NgForm) {
    if (stockForm.valid) {

      this.stockService.createStock(this.stock)
        .subscribe({
          next: (result: any) => {
            this.messageService.message = result.msg;
            this.stock = new Stock('', '', 0, 0, 'NASDAQ');
          }, 
          error: (err: HttpErrorResponse) => {
            this.messageService.message = err.error.msg;
          }
        });
    } else {
      this.messageService.message = 'Stock form is in an invalid state';
      console.error('Stock form is in an invalid state');
    }
  }

}
