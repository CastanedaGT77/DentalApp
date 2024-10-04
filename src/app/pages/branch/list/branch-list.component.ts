import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BranchService } from "../branch.service";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import { DeleteBranch } from "../delete/delete-branch.component";
import { EPermissions } from "src/app/utils/permissionEnum";

@Component({
    selector: "app-branch-list",
    templateUrl: "./branch-list.component.html"
})
export class BranchListComponent implements OnInit,AfterViewInit{
    branches = [];
    dataSource = new MatTableDataSource<any>(this.branches);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    crearSucursal: Array<EPermissions>;
    actualizarSucursal: Array<EPermissions>;
    eliminarSucursal: Array<EPermissions>;

    displayedColumns: string[] = ['id', 'name', 'isActive', 'actions'];
    
    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _branchService: BranchService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ) {
        this.crearSucursal = [EPermissions.CREAR_SUCURSALES] || [];
        this.actualizarSucursal = [EPermissions.ACTUALIZAR_SUCURSALES] || [];
        this.eliminarSucursal = [EPermissions.ELIMINAR_SUCURSALES] || [];
    }

    async ngOnInit(){
        this.spinnerService.show();
        await this.getBranches(); 
        this.spinnerService.hide();
    }

    async getBranches() {
        const response = await this._branchService.getBranches();
        if (response) {
            this.branches = response;
            this.dataSource.data = this.branches;
        } else {
            console.error('Error: No se encontraron datos en la respuesta.');
        }
    }

    // Métodos de acción llamada a editar paciente
    editBranch(branch: any) {
        //console.log('funciona paciente editar', paciente);
        this._router.navigate(['/branch/edit'], { state: { branch: branch } });
    
    }
    
    deleteBranch(branch: any): void {
        console.log('funciona delete delete', branch);
        this.dialog.open(DeleteBranch, {
            width: '300px',
            data: { branch: branch }
        }).afterClosed().subscribe(data => {
            if(data){
                this.getBranches();
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }
  
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    redirectCreate(){
        this._router.navigateByUrl("/branch/create");
    }
}