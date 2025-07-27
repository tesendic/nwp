import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stock } from '../../model/stock';
import { JsonPipe } from '@angular/common';

let counter = 1;

@Component({
  selector: 'app-create-stock',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {
  private stock: Stock;
  public stockForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {
    this.createForm();
    this.stock = new Stock('Test ' + counter++, 'TST', 20, 10);
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });

    // //alternative
    // this.stockForm = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   code: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    //   price: new FormControl(0, [Validators.required, Validators.min(0)])
    // });
  }

  setStockFrom() {
    this.stock = new Stock('Test ' + counter++, 'TST', 20, 10);
    this.stockForm.setValue(this.stock);
    // error on console
  }

  patchStockForm() {
    this.stock = new Stock(`Test ${counter++}`, 'TST', 20, 10);
    this.stockForm.patchValue(this.stock);
  }

  resetForm() {
    this.stockForm.reset();
  }

  onSubmit() {
    this.stock = Object.assign({}, this.stockForm.value);
    console.log('Saving stock', this.stock);
  }

}
