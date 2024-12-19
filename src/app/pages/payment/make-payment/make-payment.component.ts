import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from '../payment.service';
import { PatientService } from '../../patient/patient.service';
import { CreatePaymentDto } from 'src/app/data/dtos/payment/CreatePaymentDTO';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: "app-make-payment",
  templateUrl: "./make-payment.component.html",
})
export class MakePaymentComponent implements OnInit, AfterViewInit {

  patients: any[] = [];
  payment: any[] = [];
  totalAmount = 0;
  form: FormGroup;
  displayedColumns: string[] = ['select', 'piece', 'realPrice', 'pendingAmount', 'created_at', 'status', 'enteredAmount'];
  dataSource = new MatTableDataSource<any>(this.payment);
  hasPendingPayments = true;
  receiptFileUrl: SafeUrl | null = null; // Nueva variable para almacenar la URL segura del PDF

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBarService: MatSnackBar,
    private readonly _router: Router,
    private readonly spinnerService: NgxSpinnerService,
    private readonly _paymentService: PaymentService,
    private readonly _patientService: PatientService,
    private readonly sanitizer: DomSanitizer
  ) {
    this.form = this._formBuilder.group({
      patientId: ['', Validators.required],
      paymentDetails: this._formBuilder.array([]),
      receipt: this._formBuilder.group({
        name: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        address: ['', Validators.required],
      })
    });
  }

  ngOnInit() {
    this.getPatients();
  }
  
  ngAfterViewInit() {}

  get patientIdControl() {
    return this.form.get('patientId') as AbstractControl;
  }

  get receiptControl() {
    return this.form.get('receipt') as FormGroup;
  }

  get paymentDetails() {
    return this.form.get('paymentDetails') as FormArray;
  }

  getPatients() {
    this._patientService.getPatient().then(response => {
      if (response && response.patients) {
        this.patients = response.patients;
      } else {
        console.error('Error: No se encontraron pacientes en la respuesta.');
      }
    }).catch(error => {
      console.error('Error al obtener pacientes:', error);
    });
  }

  async getPendingPayment(patientId: number) {
    this.spinnerService.show();
    try {
      const response = await this._paymentService.getPatientPendingPayment(patientId);
      if (response && response.data && response.data.pendingTreatments.length > 0) {
        this.payment = response.data.pendingTreatments;
        this.paymentDetails.clear();
        const paymentDetailsArray: any[] = [];
        this.payment.forEach((treatment: any) => {
          treatment.treatmentDetails.forEach((detail: any) => {
            paymentDetailsArray.push({
              id: detail.id,
              suggestedPrice: detail.suggestedPrice,
              realPrice: detail.realPrice,
              paymentStatus: detail.paymentStatus,
              pendingAmount: detail.pendingAmount,
              piece: detail.piece,
              status: detail.status,
              patientId: detail.patientId,
              created_at: detail.created_at,
              updated_at: detail.updated_at,
              enteredAmount: detail.pendingAmount,
              selected: false
            });
          });
        });
        this.dataSource.data = paymentDetailsArray;
        this.hasPendingPayments = true;
      } else {
        this.hasPendingPayments = false;
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
      this.hasPendingPayments = false;
    } finally {
      this.spinnerService.hide();
    }
  }

  calculateTotal() {
    this.totalAmount = this.dataSource.data
      .filter((data: any) => data.selected)
      .reduce((sum: number, data: any) => {
        const amount = data.enteredAmount > data.pendingAmount ? data.pendingAmount : data.enteredAmount;
        return sum + amount;
      }, 0);
  }

  validateAmount(data: any) {
    if (data.enteredAmount > data.pendingAmount) {
      data.enteredAmount = data.pendingAmount;
    }
    this.calculateTotal();
  }

  isAnyTreatmentSelected() {
    return this.dataSource.data.some(data => data.selected);
  }

  formValid() {
    return this.receiptControl.valid && this.isAnyTreatmentSelected() && this.allAmountsValid();
  }

  allAmountsValid() {
    return this.dataSource.data.every(data => data.enteredAmount <= data.pendingAmount);
  }

  async createPayment() {
    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: '¿Confirmar pago?',
      text: 'Se procederá a realizar el pago para los tratamientos seleccionados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, proceder',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const selectedDetails = this.dataSource.data
          .filter((data: any) => data.selected)
          .map((data: any) => ({
            patientTreatmentDetailId: data.id,
            amount: data.enteredAmount > data.pendingAmount ? data.pendingAmount : data.enteredAmount,
          }));
      
        const requestData: Partial<CreatePaymentDto> = {
          patientId: this.patientIdControl.value, // Agrega el patientId desde el formulario
          ...this.form.value.receipt,
          details: selectedDetails,
        };
      
        try {
          this.spinnerService.show();
          const response = await this._paymentService.createPayment(requestData);
          if (response) { // Ahora response es un blob
            const fileUrl = window.URL.createObjectURL(response);
            this.receiptFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
            this.stepper.next(); // Avanzar al paso del recibo
            Swal.fire('Éxito', 'Pago realizado con éxito.', 'success');
            this._snackBarService.open('Pago realizado con éxito', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else {
            throw new Error('Error en el pago');
          }
        } catch (error) {
          Swal.fire('Error', 'Ocurrió un error al realizar el pago.', 'error');
          this._snackBarService.open('Error al realizar el pago', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          console.error('Error al realizar el pago:', error);
        } finally {
          this.spinnerService.hide();
        }
      }
    });
  }

  async returnPage() {
    this._router.navigateByUrl("/payment/listAll");
  }
}
