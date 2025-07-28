import { ChangeDetectorRef, Component, signal, WritableSignal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, share, startWith, Subject, switchMap, tap } from 'rxjs';
import { Stock } from '../../model/stock';
import { AuthService } from '../../services/auth.service';
import { StockService } from '../../services/stock.service';
import { StockItemComponent } from '../stock-item/stock-item.component';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stock-list',
  imports: [StockItemComponent, FormsModule, AsyncPipe],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent {

  public stocks: WritableSignal<Stock[]> = signal([])
  public stocks$: Observable<Stock[]> | undefined
  public stocks2: Stock[] = []
  public stocks3: Stock[] = []
  constructor(private stockService: StockService, private authService: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchStocksSignal()
    this.fetchStocksAsyncPipe()
    this.fetchStocksChangeDetector()
    //this.fetchStocksQuery();
  }

  fetchStocksSignal() {
    // retrieve data and update view using signals
    this.stockService.getStocks()
      .subscribe((stocks: Stock[]) => {
        this.stocks.set(stocks)
      });
  }

  fetchStocksAsyncPipe() {
    //retrieve data and update view using async pipe
    //async pipe does subscription
    //tap saves data in separate variable for future updates
    this.stocks$ = this.stockService.getStocks().pipe(
      tap((stocks: Stock[]) => {
        this.stocks2 = stocks
      })
    )
  }

  fetchStocksChangeDetector() {
    //retrieve data and update view with explicit change detection
    this.stockService.getStocks()
    .subscribe((stocks: Stock[]) => {
      this.stocks3 = stocks
      this.cdr.detectChanges();
    });
  }

  fetchStocks() {
    this.fetchStocksSignal()
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

  onToggleFavorite(stock: Stock) {
    this.stockService.toggleFavorite(stock)
      .subscribe(
        (s) => {
            // change data but this is not propagated to the view
            stock.favorite = !stock.favorite

            //update signal variable to trigger changes of the view
            this.stocks.set([...this.stocks()])

            //update data for async pipe version to trigger changes of the view
            this.stocks$ = of(this.stocks2)

            //changeDetector version requre exlicit call of the function to trigger changes
            //this.cdr.detectChanges()
        })
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
