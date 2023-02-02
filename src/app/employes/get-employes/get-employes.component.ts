import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-employes',
  templateUrl: './get-employes.component.html',
  styleUrls: ['./get-employes.component.scss']
})
export class GetEmployesComponent implements OnInit {

  @ViewChild('agGridSalario') agGridSalario!: AgGridAngular;  

  tipoId = [
    { doc: 'Cédula de ciudadanía' },
    { doc: 'Cédula de extranjería' },
    { doc: '(otro)' },    
  ]

  sexo = [
    {tipoS: 'Masculino'},
    {tipoS: 'Femenino'}
  ]

  checked = true;

  eliminarCellRenderer = function () {
    let html = "<span style='font-size:21px; color:goldenrod;'>&#9733;</span>";
    return `<mat-icon class="mat-icon material-icons" style="color:#dc3545;cursor:pointer; font-size:32px" role="img" aria-hidden="true">clear</mat-icon>`;
  }

  gridOptionsSalario: GridOptions;
  public rowData$!: Observable<any[]>;

  listaSalario = [{ cargo: '', fecha: '', valor:'' }]; 

  columnDefsSalario: any[] = [
    { headerName: 'Cargo', field: 'cargo', filter: true, width: 300, editable: true, },
    { headerName: 'Periodo (yyyy-mm)', field: 'date', filter: true, width: 300, editable: true, },
    { headerName: 'Salario', field: 'valor', filter: true, width: 280, editable: true, }, 
    { groupId: 'deletBtn', sortable: true, width: 50, resizable: true, cellRenderer: this.eliminarCellRenderer,
        tooltipValueGetter: function getTooltip() {
          return 'Eliminar'
        }
    }   
  ];  

  constructor(
    private http: HttpClient,
  ) { 

    this.gridOptionsSalario = <GridOptions>{
      rowSelection: 'single',
      localeText: { noRowsToShow: 'No hay empleados' }
    };
  }

  ngOnInit(): void {
  }

  onCellClicked(par: any) {
    if (par.colDef.groupId === 'deletBtn') {
      this.delRow(par);
    }
   }

   delRow(param: any) {    
    this.listaSalario.splice(param.rowIndex, 1)    
    this.agGridSalario.api.setRowData(this.listaSalario)
   }

   addRow() {
    this.listaSalario.push({ cargo: '', fecha: '', valor: '' })
    this.agGridSalario.api.setRowData(this.listaSalario)
  }

 

}
