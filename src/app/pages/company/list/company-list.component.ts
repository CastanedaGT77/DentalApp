import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CompanyService } from "../company.service";
import { CompanyEditModalComponent } from "../update/company-edit-modal.component";

@Component({
    selector: "app-company-list",
    templateUrl: "./company-list.component.html"
})
export class CompanyListComponent implements OnInit, AfterViewInit {
    companyId: any;
    company: any = null;
    logoUrl: SafeResourceUrl | null = null;

    displayedColumns: string[] = ["title", "description", "date", "image", "actions"];
    newsDataSource = new MatTableDataSource([
        {
            title: "Noticia 1",
            description: "Descripción de la noticia 1",
            date: "2024-12-01",
            image: './assets/images/products/s5.jpg',
        },
        {
            title: "Noticia 2",
            description: "Descripción de la noticia 2",
            date: "2024-12-02",
            image: './assets/images/products/s5.jpg',
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
            if (this.company.logo) {
                this.logoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.company.logo);
            }
        }
    }

    openEditDialog() {
        const dialogRef = this.dialog.open(CompanyEditModalComponent, {
            width: "500px",
            data: this.company
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getCompanyProperties();
            }
        });
    }

    editNews(news: any) {
        console.log("Editar noticia:", news);
    }

    deleteNews(news: any) {
        console.log("Eliminar noticia:", news);
    }

    async ngOnInit() {
        this.companyId = localStorage.getItem("companyId");
        this.spinnerService.show();
        await this.getCompanyProperties();
        this.spinnerService.hide();
    }

    ngAfterViewInit() {
        this.newsDataSource.paginator = this.paginator;
    }
}
