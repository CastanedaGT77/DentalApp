import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";

@Component({
    selector: "app-create-date",
    templateUrl: "./create-date.component.html"
})
export class CreateDateComponent {
    type: "create" | "edit";
    form: FormGroup;
    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _dialog: MatDialog,
        // private readonly _branchService: BranchService,
        private readonly _sanitizer: DomSanitizer,
        private readonly datePipe: DatePipe
    ){
        this.type = this._route.snapshot.data["type"] ?? "create";
        this.createForm();
    }

    private createForm(){
        this.form = this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            datetime: ['', Validators.required],
            time: ['', Validators.required]
        });
    }

    async ngOnInit() {
        if(this.type === "create"){
            //this.getDetalles();
        }
        else if(this.type === "edit"){
            //console.log('statee',history.state)
            // this.illnessDetail = history.state.illnessDetail;
            await this.initializeForm();
        }
    }

    pruebaFecha(){
        const formattedDate = this.datePipe.transform(this.datetime, 'dd/MM/yyyy');
        console.log('fecha', this.datetime)
        console.log('fecha formateada', formattedDate)
        console.log('hora', this.time)
    }

    get datetime() {
        return this.form.get('datetime')?.value;
    }
    
    get time() {
        return this.form.get('time')?.value;
    }

    async returnPage(){
        this._router.navigateByUrl("/date/calendar");
    }

    private async initializeForm(){
       
        
    }

}