import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCode } from 'qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  scannedBarcode = '';
  code = '';

  form: FormGroup;

  @ViewChild('barcode', { static: false }) el!: ElementRef;

  constructor(private builder: FormBuilder) {
    this.form = this.builder.group({
      input: '',
      type: 'code128',
    });
  }

  generateBarCode() {
    JsBarcode('#barcode', this.form.get('input').value, {
      format: this.form.get('type').value,
      displayValue: true,
      lineColor: 'black',
      width: 2,
      // width: 1.4
      fontOptions: 'bold',
      height: 120,
      fontSize: 30,
    });
  }

  printBarCode() {
    const element = document.getElementById('barcodeprint');

    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({
        orientation: 'l',
        unit: 'ex',
        // height, width
        format: [40, 180],
      });

      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const position = 0;
      doc.addImage(imgData, 0, position, imgWidth, imgHeight);

      doc.output('dataurlnewwindow');
    });
  }

  printQrCode() {
    const element = document.getElementById('qrcodeprint');

    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({
        orientation: 'l',
        unit: 'ex',
        // height, width
        format: [10, 140],
      });

      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const position = 0;
      doc.addImage(imgData, 0, position, imgWidth, imgHeight);

      doc.output('dataurlnewwindow');
    });
  }

  onKey(e: any) {
    if (e.key === 'Enter') {
      if (this.code) this.scannedBarcode = this.code;
      this.code = '';
      return;
    } else this.code += e.key;
  }

  get qrcodeValue(): string {
    return this.form.get('input').value;
  }
}
