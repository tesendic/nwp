import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent {
  public name: string = 'Test Stock Company';
  public code: string = 'TSC';
  public price: number = 85;
  public previousPrice: number = 87;

  public positiveChange: boolean = this.price >= this.previousPrice;

  public favorite: boolean = false;

  
  toggleFavorite(event: any) {
    console.log('We are toggling the favorite state for this stock', event);
    this.favorite = !this.favorite;
  }




}
