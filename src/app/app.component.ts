import { Component } from '@angular/core';
import { GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetEmployesComponent } from './employes/get-employes/get-employes.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employes';

  gridOptions: GridOptions;
  lista = [
    { name: 'Jaimero', number:'222222', tipo:'cc', fecha: '12 enero 1965', cargo: 'Conductor' },
   
  ];
  public rowData$!: Observable<any[]>;
  columnDefsGeneral: any[] = [
    { headerName: 'Nombre', field: 'name', filter: true, width: 350 },
    { headerName: 'DNI', field: 'number', filter: true, width: 350 },
    { headerName: 'Tipo DNI', field: 'tipo', filter: true, width: 350 },
    { headerName: 'Fecha Ingreso', field: 'fecha', filter: true, width: 350 },
    { headerName: 'Cargo', field: 'cargo', filter: true, width: 350 },
  ];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  )
{
  this.gridOptions = <GridOptions>{
    rowSelection: 'single',
    localeText: { noRowsToShow: 'No hay empleados' }
  };
}

getEmploye() {  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true; 
  
  dialogConfig.height = '800px';
  dialogConfig.width = '1000px';
  dialogConfig.panelClass = 'custom-modal';
  const dialogRef = this.dialog.open(GetEmployesComponent, dialogConfig);

}

onGridReady(params: GridReadyEvent) {
  this.rowData$ = this.http
    .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
}
}
