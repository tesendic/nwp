import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-create-stock',
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