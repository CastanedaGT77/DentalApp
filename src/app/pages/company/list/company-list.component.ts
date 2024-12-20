import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CompanyService } from "../company.service";
import { CompanyEditModalComponent } from "../update/company-edit-modal.component";
import Swal from "sweetalert2";
import { NewsCreateModalComponent } from "../create-new/news-create-modal.component";

@Component({
    selector: "app-company-list",
    templateUrl: "./company-list.component.html"
})
export class CompanyListComponent implements OnInit, AfterViewInit {
    companyId: any;
    company: any = null; // Datos de la empresa
    logoUrl: SafeResourceUrl | null = null;

    displayedColumns: string[] = ["title", "description", "date", "image", "actions"];
    newsDataSource = new MatTableDataSource([
        {
            title: "Noticia 1",
            description: "Descripción de la noticia 1",
            date: "2024-12-01",
            image: "https://via.placeholder.com/150"
        },
        {
            title: "Noticia 2",
            description: "Descripción de la noticia 2",
            date: "2024-12-02",
            image: "https://via.placeholder.com/150"
        }
    ]);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private spinnerService: NgxSpinnerService,
        private _companyService: CompanyService,
        private readonly _sanitizer: DomSanitizer
    ) {}

    async getCompanyProperties() {
        const response = await this._companyService.getCompanyProperties(this.companyId);
        if (response) {
            this.company = response.data;
            console.log("respuesta company1", this.company);

            if (this.company.logo) {
                this.logoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
                    this.company.logo
                );
            }
        } else {
            console.error("Error: No se encontraron datos en la respuesta.");
        }
    }

    openEditDialog() {
        const dialogRef = this.dialog.open(CompanyEditModalComponent, {
            width: "500px",
            data: this.company
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getCompanyProperties(); // Recarga los datos
            }
        });
    }

    openCreateNewsDialog() {
        const dialogRef = this.dialog.open(NewsCreateModalComponent, {
            width: "600px"
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                Swal.fire("Éxito", "La noticia fue creada exitosamente", "success");
                // Añade la nueva noticia al listado
                this.newsDataSource.data = [...this.newsDataSource.data, result];
            }
        });
    }

    editNews(news: any) {
        console.log("Editar noticia:", news);
    }

    deleteNews(news: any) {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la noticia seleccionada.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                this.newsDataSource.data = this.newsDataSource.data.filter(
                    (item) => item !== news
                );
                Swal.fire("Eliminada", "La noticia fue eliminada correctamente.", "success");
            }
        });
    }

    async ngOnInit() {
        this.companyId = localStorage.getItem("companyId");
        this.spinnerService.show();
        await this.getCompanyProperties();
        this.spinnerService.hide();
        this.newsDataSource.paginator = this.paginator;
    }

    ngAfterViewInit() {}
}
