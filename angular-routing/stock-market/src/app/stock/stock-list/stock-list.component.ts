import { ChangeDetectorRef, Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, share, startWith, Subject, switchMap } from 'rxjs';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { StockItemComponent } from '../stock-item/stock-item.component';

@Component({
  selector: 'app-stock-list',
  imports: [StockItemComponent],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent {

  public stocks: Stock[] = [];
  constructor(private stockService: StockService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchStocks();
    //this.fetchStocksQuery();
  }

  fetchStocks() {
    this.stockService.getStocks()
      .subscribe((stocks: Stock[]) => {
        this.stocks = stocks;
        this.cdr.detectChanges()
      });
  }

  onToggleFavorite(stock: Stock) {
    this.stockService.toggleFavorite(stock)
      .subscribe(
        (s) => {
            stock.favorite = !stock.favorite
            this.stocks = [...this.stocks]
            this.cdr.detectChanges()
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
  //     this.stocks = stocks;
  //   });;
  // }

  // search() {
  //   this.searchTerms.next(this.searchString);
  // }

}
