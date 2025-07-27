import { Component, signal, WritableSignal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, share, startWith, Subject, switchMap } from 'rxjs';
import { Stock } from '../../model/stock';
import { AuthService } from '../../services/auth.service';
import { StockService } from '../../services/stock.service';
import { StockItemComponent } from '../stock-item/stock-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-list',
  imports: [StockItemComponent, FormsModule],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent {

  public stocks: WritableSignal<Stock[]> = signal([]);
  constructor(private stockService: StockService, private authService: AuthService) { }

  ngOnInit() {
    this.fetchStocks();
    //this.fetchStocksQuery();
  }

  fetchStocks() {
    this.stockService.getStocks()
      .subscribe((stocks: Stock[]) => {
        this.stocks.set(stocks)
      });
  }

  setAuthToken() {
    this.authService.authToken = 'TESTING';
  }

  resetAuthToken() {
    this.authService.authToken = undefined;
  }

  makeFailingCall() {
    this.stockService.makeFailingCall().subscribe({
      next: (res: any) => console.log('Successfully made failing call', res),
      error: (err: any) => console.error('Error making failing call', err)
    });
  }

  // public searchString: string = '';
  // private searchTerms: Subject<string> = new Subject();

  // fetchStocksQuery() {
  //   this.searchTerms.pipe(
  //     startWith(this.searchString),
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap((query) => this.stockService.getStocksQuery(query)),
  //     share()
  //   ).subscribe((stocks: Stock[]) => {
  //     this.stocks.set(stocks);
  //   });;
  // }

  // search() {
  //   this.searchTerms.next(this.searchString);
  // }

}
