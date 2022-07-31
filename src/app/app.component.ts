import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  barcode = '';
  scannedBarcode = '';
  code = '';

  form: FormGroup;

  constructor(private builder: FormBuilder) {
    this.form = this.builder.group({
      input: '',
      type: 'code128'
    })
  }

  generateBarCode() {
    JsBarcode('#barcode', this.form.get('input').value, {
      format: this.form.get('type').value,
      displayValue: true,
      lineColor: 'black',
      width: 1,
      fontOptions: 'bold',
      height: 60,
      fontSize: 15,
    });
  }

  printCode() {
    const divContents = document.getElementById("barcodeprint").innerHTML;
    const a = window.open('', '', '');
    a.document.write(divContents);
    a.document.close();
    a.print();
  }

  onKey(e: any) {
    if (e.key === 'Enter') {
      if (this.code) this.scannedBarcode = this.code;
      this.code = '';
      return;
    }

    else this.code += e.key;
  }
}

