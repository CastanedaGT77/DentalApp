import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import { EPermissions } from "src/app/utils/permissionEnum";
import { DocumentService } from "../document.service";

@Component({
    selector: "app-document-list-all",
    templateUrl: "./document-list-all.component.html"
})
export class DocumentListAll implements OnInit,AfterViewInit{
    documents: any[] = [];
    dataSource = new MatTableDataSource<any>(this.documents);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    crearDocumento: Array<EPermissions>;

    displayedColumns: string[] = ['id', 'fileName', 'fileCode', 'uploadedBy', 'created_at', 'actions'];
    
    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _documentService: DocumentService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ) {
        this.crearDocumento = [EPermissions.CREAR_SUCURSALES];
    }

    async ngOnInit(){
        this.spinnerService.show();
        await this.getDocuments(); 
        this.spinnerService.hide();
    }

    async getDocuments() {
        try {
          const response = await this._documentService.getAllDocuments();
          if (response && Array.isArray(response)) {
            this.documents = response;
            console.log('Documentos1:', this.documents);  // Verifica la estructura aquí

            this.dataSource.data = this.documents; // Para el componente de archivos
            console.log('Documentos2:', this.dataSource.data);  // Verifica la estructura aquí
          } else {
            console.error('Error: No se encontraron datos en la respuesta o no es un array.');
          }
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }
  
    ngAfterViewInit() {
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Paginator no encontrado');
        }
    }
      
    redirectCreate(){
        this._router.navigateByUrl("/document/create");
    }
}