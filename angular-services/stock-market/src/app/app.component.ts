import { Component } from '@angular/core';
import { Stock } from './model/stock';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
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
