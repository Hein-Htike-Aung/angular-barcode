import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  barcode = '';
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
      width: 1.4,
      fontOptions: 'bold',
      height: 120,
      fontSize: 30,
    });
  }

  printCode() {
    const element = document.getElementById('barcodeprint');

    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // const doc = new jsPDF('p', 'mm', 'a4');
      const doc = new jsPDF({
        orientation: 'l',
        unit: 'ex',
        // height, width
        format: [40, 190],
      });

      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const position = 0;
      doc.addImage(imgData, 0, position, imgWidth, imgHeight);

      doc.output('dataurlnewwindow');
    });
  }

  printBarcode() {
    // const doc = new jsPDF({
    //   orientation: 'l',
    //   unit: 'mm',
    //   format: [40, 20],
    // });
    // doc.setFontSize(9);
    // doc.setFont('Helvetica', 'bold');
    // doc.text('Majica', 2, 4, 'left');
    // drawBarcode('1002366', { width: 0.3 }, doc);
    // doc.text('1002366', 2, 19, 'left');
    // doc.output('datauristring');
    // var result = doc.output('dataurlstring');
    // pdfobject.embed(result, '#elemEmb', {
    //   width: '500px',
    //   height: '500px',
    //   id: 'embeded',
    // });
  }

  onKey(e: any) {
    if (e.key === 'Enter') {
      if (this.code) this.scannedBarcode = this.code;
      this.code = '';
      return;
    } else this.code += e.key;
  }
}
