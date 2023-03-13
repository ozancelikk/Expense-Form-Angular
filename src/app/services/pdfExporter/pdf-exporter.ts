import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { GridApi } from "ag-grid-community";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import getDocDefinition from "./docDefinition";

@Injectable({
  providedIn: 'root'
})
export class PDFExporter {
  printParams = {
    PDF_HEADER_COLOR: "dde2eb",
    PDF_INNER_BORDER_COLOR: "#dde2eb",
    PDF_OUTER_BORDER_COLOR: "#babfc7",
    PDF_PAGE_ORITENTATION: "landscape",
    PDF_WITH_HEADER_IMAGE: true,
    PDF_WITH_FOOTER_PAGE_COUNT: true,
    PDF_HEADER_HEIGHT: 5,
    PDF_ROW_HEIGHT: 5,
    PDF_ODD_BKG_COLOR: "#fcfcfc",
    PDF_EVEN_BKG_COLOR: "#ffffff",
    PDF_WITH_CELL_FORMATTING: false,
    PDF_WITH_COLUMNS_AS_LINKS: false,
    PDF_SELECTED_ROWS_ONLY: false,
  };
  /**
   *
   */
  constructor(private datePipe: DatePipe) {

  }
  exportPDF(gridApi, columnApi, pdfGridApi:GridApi = null, pdfColumnGridApi = null,reportFieldGridApi=null,reportFieldGridColumn=null) {

   

    if (pdfGridApi != null && reportFieldGridApi != null) {
      const reportFieldDocDefinition = getDocDefinition(this.printParams, reportFieldGridApi, reportFieldGridColumn);
      const logDocDefinition = getDocDefinition(this.printParams, pdfGridApi, pdfColumnGridApi)
      const docDefinition = getDocDefinition(this.printParams,gridApi,columnApi)

      reportFieldDocDefinition.images["ag-grid-logo"] = location.origin + "/assets/images/oriana-logo-black.png"
      reportFieldDocDefinition.content.map(x=> x.table.body.shift())
      docDefinition.content.map(x => {
        x.table.headerRows = 0
        x.table.body.shift()
      })
      logDocDefinition.content.map(x => {
        x.table.headerRows = 0
        x.table.body.shift()
      })
      if (reportFieldDocDefinition) {
        reportFieldDocDefinition.content.push(...docDefinition.content)
        reportFieldDocDefinition.content.push(...logDocDefinition.content)
   
        var date = this.datePipe.transform(new Date(), "yyyy-MM-dd-HH-mm-ss")

        pdfMake.createPdf(reportFieldDocDefinition).download(date + ".pdf")

      }
    } else {
      const docDefinition = getDocDefinition(this.printParams,gridApi,columnApi)
      docDefinition.images["ag-grid-logo"] = location.origin + "/assets/images/oriana-logo-black.png"
      docDefinition.content.map(x => x.table.body.shift())
      var date = this.datePipe.transform(new Date(), "yyyy-MM-dd-HH-mm-ss")
      pdfMake.createPdf(docDefinition).download(date + ".pdf")

    }

    //console.log(docDefinition)

  }
}
