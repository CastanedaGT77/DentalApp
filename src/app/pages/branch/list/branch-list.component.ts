import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BranchService } from "../branch.service";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-branch-list",
    templateUrl: "./branch-list.component.html"
})
export class BranchListComponent{
    branches = [];
    dataSource = new MatTableDataSource<any>(this.branches);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['id', 'name', 'actions'];
    
    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _branchService: BranchService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ) {}

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
    editBranch(illnessDetail: any) {
        //console.log('funciona paciente editar', paciente);
        this._router.navigate(['/illnessDetail/edit'], { state: { illnessDetail: illnessDetail } });
    
    }
    
    deleteBranch(illnessDetail: any): void {
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