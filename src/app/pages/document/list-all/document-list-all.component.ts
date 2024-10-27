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
export class DocumentListAll implements OnInit, AfterViewInit {
    documents: any[] = [];
    dataSource = new MatTableDataSource<any>(this.documents);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    crearDocumento: Array<EPermissions>;

    displayedColumns: string[] = ['id', 'icon', 'fileName', 'uploadedBy', 'created_at', 'actions'];
    
    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _documentService: DocumentService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ) {
        this.crearDocumento = [EPermissions.CREAR_SUCURSALES];
    }

    async ngOnInit() {
        this.spinnerService.show();
        await this.getDocuments(); 
        this.spinnerService.hide();
    }

    async getDocuments() {
        try {
            const response = await this._documentService.getAllDocuments();
            if (response && Array.isArray(response)) {
                this.documents = response;
                this.dataSource.data = this.documents;
            } else {
                console.error('Error: No se encontraron datos en la respuesta o no es un array.');
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    getFileIcon(fileName: string) {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'doc':
            case 'docx':
                return { name: 'file-text', color: '#2a72b5' }; // Azul para documentos
            case 'xls':
            case 'csv':
            case 'xlsx':
                return { name: 'file-spreadsheet', color: '#1c8b24' }; // Verde para hojas de cálculo
            case 'pdf':
                return { name: 'file', color: '#e23e57' }; // Rojo para PDFs
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return { name: 'photo', color: '#fbbd08' }; // Amarillo para imágenes
            default:
                return { name: 'file-unknown', color: '#6c757d' }; // Gris para archivos desconocidos
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

    viewDocument(document: any) {
      console.log('Visualizando el archivo:', document);
    }

    getDecodedFileName(fileName: string): string {
      try {
          return decodeURIComponent(escape(fileName));
      } catch (e) {
          return fileName; // Si ocurre un error, devuelve el nombre original
      }
    }
  
    redirectCreate() {
        this._router.navigateByUrl("/document/create");
    }
}
