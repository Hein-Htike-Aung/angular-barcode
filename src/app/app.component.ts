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

  form: FormGroup;

  title = 'barcode';

  constructor(private builder: FormBuilder) {
    this.form = this.builder.group({
      input: '',
      type: 'code128'
    })
  }

  generateBarCode() {
    JsBarcode('#barcode', JSON.stringify(this.form.get('input').value), {
      format: this.form.get('type').value,
      displayValue: true,
      lineColor: 'black',
      width:1,
      height: 40,
      fontSize: 20,
    });
  }

  printCode() {
    var divContents = document.getElementById("barcodeprint").innerHTML;
    var a = window.open('', '', '');
    a.document.write('<html>');
    a.document.write('<body > <h3>Bar code is </h3>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
  }
}
