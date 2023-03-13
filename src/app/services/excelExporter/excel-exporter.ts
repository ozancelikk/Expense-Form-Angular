import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { ColumnApi, GridApi, stringToArray } from "ag-grid-community";
import { ILanguage } from "src/assets/locales/ILanguage";
import { Languages } from "src/assets/locales/languages";
import * as XLSX from 'xlsx'


@Injectable({
    providedIn: 'root'
})

export class ExcelExporter {
    constructor(private datePipe: DatePipe) {

    }
    private lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
    excelExporter(gridApi: GridApi, colApi: ColumnApi, index = 0, type: string = '') {
        let obj = Object.assign({})

        let exportData = []
        let colDefs = colApi.getAllDisplayedColumns().map(x => x.getColDef())
        if (index == 0 && type == 'log') {
            gridApi.forEachNodeAfterFilterAndSort(node => {
                colDefs.map(x => x).forEach((col) => {
                    if (col.headerName === this.lang.level || col.headerName === this.lang.description) {
                        obj[col.headerName] = gridApi.getValue(col.field, node).join(" ")

                    } else {
                        if (col !== undefined) {
                            // arrayObject.push(obj[col]=this.entities.gridApi.getValue(col,node))

                            obj[col.headerName] = gridApi.getValue(col.field, node)
                        }
                    }
                })
                exportData.push(obj)
            })
        } else {
            gridApi.forEachNodeAfterFilterAndSort(node => {
                if (node.rowIndex == index) {
                    colDefs.map(x => x).forEach((col) => {
                        if (col !== undefined) {
                            // arrayObject.push(obj[col]=this.entities.gridApi.getValue(col,node))
                            if (col.headerName == this.lang.reportgroup || col.headerName == this.lang.reportfields) {
                                if (gridApi.getValue(col.field, node)) {
                                    obj[col.headerName] = gridApi.getValue(col.field, node).join(", ")
                                }else{
                                    obj[col.headerName]=""
                                }
                            } else {
                                obj[col.headerName] = gridApi.getValue(col.field, node)
                            }

                        }
                    })
                    exportData.push(obj)
                }
            })
           
        }

        const fileName = 'test.xlsx';
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData)
        const wb: XLSX.WorkBook = XLSX.utils.book_new();



        // const max_width =  arrayObject.reduce((w,r)=>Math.max(w,r.log.length),10)
        //console.log(arrayObject)
        XLSX.utils.book_append_sheet(wb, ws, "log", true);
        switch (colApi.getAllDisplayedColumns().length.toString()) {
            case '1': {
                wb.Sheets['log']["!autofilter"] = { ref: "A1" }

                break
            }
            case '2': {
                wb.Sheets['log']["!autofilter"] = { ref: "A1:B1" }
                break
            }
            case '3': {
                wb.Sheets['log']["!autofilter"] = { ref: "A1:C1" }
                break
            }
            case '4': {
                wb.Sheets['log']["!autofilter"] = { ref: "A1:D1" }
                break
            }
            case '5': {
                wb.Sheets['log']["!autofilter"] = { ref: "A1:E1" }
                break
            }
        }
        let colItem: XLSX.ColInfo[] = []
        colApi.getAllDisplayedColumns().forEach(() => {
            colItem.push({ width: 25, wpx: 35 })
        })
        let rowItem: XLSX.RowInfo[] = []
        exportData.forEach((x, index) => {
            if (index === 0) {
                rowItem.push({ hpx: 15 })
            } else {
                rowItem.push({ hpx: 35, hpt: 35 })
            }
        })
        rowItem.push({ hpx: 35, hpt: 35 })

        wb.Sheets['log']["!cols"] = colItem
        wb.Sheets['log']["!rows"] = rowItem
        var date = this.datePipe.transform(new Date(), "yyyy-MM-dd-HH-mm-ss")
        if (index == 0 && type == 'log') {
            XLSX.writeFile(wb, date.toString() + ".xlsx")
        } else {
            XLSX.writeFile(wb, date.toString() + '-' + this.lang.report + ".xlsx")
        }

        //  XLSX.writeFile(wb, fileName);
    }

}