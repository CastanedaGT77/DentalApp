import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CompanyService } from "../company.service";
import { CompanyEditModalComponent } from "../update/company-edit-modal.component";
import { NewsCreateModalComponent } from "../create-new/news-create-modal.component";
import { DeleteNew } from "../delete-new/delete-new.component";
import Swal from "sweetalert2";

@Component({
    selector: "app-company-list",
    templateUrl: "./company-list.component.html"
})
export class CompanyListComponent implements OnInit, AfterViewInit {
    companyId: any;
    company: any = null; // Datos de la empresa
    logoUrl: SafeResourceUrl | null = null;

    news = [];
    dataSource = new MatTableDataSource<any>(this.news);

    displayedColumns: string[] = ["id","title", "description", "date", "image", "available", "actions"];
    newsDataSource = new MatTableDataSource([]);

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
            width: "600px",
        });
    
        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.success) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Noticia creada exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                this.loadAllNews(); // Recarga las noticias después de una creación exitosa
            } else if (result && result.error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un problema al crear la noticia.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        });
    }
    
    openEditNewsDialog(news: any) {
        const dialogRef = this.dialog.open(NewsCreateModalComponent, {
            width: "600px",
            data: news, // Pasamos los datos de la noticia seleccionada
        });
    
        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.success) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Noticia actualizada exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                this.loadAllNews(); // Recarga las noticias después de una edición exitosa
            } else if (result && result.error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un problema al actualizar la noticia.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        });
    }

    async toggleAvailable(news: any) {
        const newStatus = !news.available; // Cambia el estado actual
        Swal.fire({
          title: 'Confirmar acción',
          text: `¿Está seguro de que desea cambiar el estado a ${
            newStatus ? 'Disponible' : 'No Disponible'
          }?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cambiar',
          cancelButtonText: 'Cancelar',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await this._companyService.toggleNewsAvailable(news.id);
              if (response && response.code === 201) {
                news.available = newStatus; // Actualiza el estado en el objeto local
                Swal.fire(
                  'Éxito',
                  'El estado de disponibilidad fue cambiado exitosamente.',
                  'success'
                );
              } else {
                throw new Error('No se pudo cambiar el estado.');
              }
            } catch (error) {
              console.error('Error al cambiar el estado:', error);
              Swal.fire(
                'Error',
                'Ocurrió un problema al intentar cambiar el estado.',
                'error'
              );
            }
          }
        });
      }

    formatUrl(url: string): string {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          return `https://${url}`;
        }
        return url;
    }

    editNews(news: any) {
        console.log("Editar noticia:", news);
    }

    deleteNew(element: any): void {
        console.log('funciona delete delete', element);
        this.dialog.open(DeleteNew, {
            width: '300px',
            data: { element: element }
        }).afterClosed().subscribe(data => {
            if(data){
                this.loadAllNews();
            }
        });
    }

    async loadAllNews() {
        try {
            const response = await this._companyService.getAllNews();
            if (response) {
                // Ajusta el formato de las noticias para que sean compatibles con el componente
                this.news = response.data.map((newsItem: any) => ({
                    id: newsItem.id,
                    title: newsItem.title,
                    description: newsItem.description,
                    date: new Date(newsItem.created_at).toLocaleDateString(), // Convierte la fecha
                    image: newsItem.image,
                    available: newsItem.available ? "Sí" : "No" // Transforma el booleano en texto
                }));
    
                this.newsDataSource.data = this.news; // Asigna los datos al dataSource
                console.log('news', this.newsDataSource.data);
            } else {
                console.error('Error: No se encontraron datos en la respuesta.');
            }
        } catch (error) {
            console.error('Error al cargar las noticias:', error);
        }
    }
    

    async ngOnInit() {
        this.companyId = localStorage.getItem("companyId");
        this.spinnerService.show();
        await this.getCompanyProperties();
        await this.loadAllNews();
        this.spinnerService.hide();
        this.newsDataSource.paginator = this.paginator;
    }

    ngAfterViewInit() {}
}
