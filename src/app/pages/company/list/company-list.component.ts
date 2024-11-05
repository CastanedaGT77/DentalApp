import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CompanyService } from "../company.service";

@Component({
    selector: "app-company-list",
    templateUrl: "./company-list.component.html"
})
export class CompanyListComponent implements OnInit, AfterViewInit {
    companyId: any;
    company: any = null; // Asegúrate de que esto esté en formato objeto
    logoUrl: SafeResourceUrl | null = null;

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
            this.company = response.data; // Asigna el objeto completo
            console.log("respuesta company1", this.company);
            // Si el logo viene en base64, lo sanitizamos para mostrarlo en el HTML
            if (this.company.logo) {
                // Añade el prefijo si es necesario
                this.logoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
                    `data:image/png;base64,${this.company.logo}`
                );
            }
        } else {
            console.error("Error: No se encontraron datos en la respuesta.");
        }
    }

    async ngOnInit() {
        this.companyId = localStorage.getItem("companyId");
        this.spinnerService.show();
        await this.getCompanyProperties();
        this.spinnerService.hide();
    }

    ngAfterViewInit() {}
}
