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
    documents = [];
    dataSource = new MatTableDataSource<any>(this.documents);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    crearDocumento: Array<EPermissions>;

    displayedColumns: string[] = ['id', 'name', 'isActive', 'actions'];
    
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
       
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }
  
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    redirectCreate(){
        this._router.navigateByUrl("/document/create");
    }
}