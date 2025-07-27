import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-create-stock',
  imports: [FormsModule, JsonPipe],
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  public stock: Stock;
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  public message: string | undefined;

  constructor(private stockService: StockService) {
    this.stock = new Stock('', '', 0, 0, 'NASDAQ');
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
            this.message = result.msg;
            this.stock = new Stock('', '', 0, 0, 'NASDAQ');
          }, 
          error: (err: HttpErrorResponse) => {
            this.message = err.error.msg;
          }
        });
    } else {
      this.message = 'Stock form is in an invalid state';
      console.error('Stock form is in an invalid state');
    }
  }

}