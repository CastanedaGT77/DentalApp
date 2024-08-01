import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from '../payment.service';
import { PatientService } from '../../patient/patient.service';
import { CreatePaymentDto } from 'src/app/data/dtos/payment/CreatePaymentDTO';

@Component({
  selector: "app-make-payment",
  templateUrl: "./make-payment.component.html",
})
export class MakePaymentComponent implements OnInit, AfterViewInit {

  patients: any[] = [];
  payment = [];
  totalAmount = 0;
  form: FormGroup;
  displayedColumns: string[] = ['select', 'piece', 'realPrice', 'pendingAmount', 'created_at', 'status'];

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBarService: MatSnackBar,
    private readonly _router: Router,
    private readonly spinnerService: NgxSpinnerService,
    private readonly _paymentService: PaymentService,
    private readonly _patientService: PatientService,
  ) {
    this.form = this._formBuilder.group({
      patientId: ['', Validators.required],
      paymentDetails: this._formBuilder.array([]),
      receipt: this._formBuilder.group({
        name: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        address: ['', Validators.required],
        paymentMethod: ['', Validators.required],
        amount: [0, Validators.required],
        change: [0, Validators.required],
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
      console.log('response', response);
      if (response && response.data) {
        this.payment = response.data.pendingTreatments;
        this.paymentDetails.clear();
        this.payment.forEach((treatment: any) => {
          treatment.treatmentDetails.forEach((detail: any) => {
            this.paymentDetails.push(this._formBuilder.group({
              id: [detail.id],
              suggestedPrice: [detail.suggestedPrice],
              realPrice: [detail.realPrice],
              paymentStatus: [detail.paymentStatus],
              pendingAmount: [detail.pendingAmount],
              piece: [detail.piece],
              status: [detail.status],
              patientId: [detail.patientId],
              created_at: [detail.created_at],
              updated_at: [detail.updated_at],
              selected: [false]
            }));
          });
        });
        console.log('paymentDetails', this.paymentDetails.value);
        // Ensure that the table dataSource is updated
        this.form.controls['paymentDetails'].updateValueAndValidity();
      } else {
        console.error('Error: No se encontraron datos en la respuesta.');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      this.spinnerService.hide();
    }
  }

  calculateTotal() {
    this.totalAmount = this.paymentDetails.controls
      .filter((control: AbstractControl) => control.get('selected')?.value)
      .reduce((sum: number, control: AbstractControl) => sum + control.get('realPrice')?.value, 0);
  }

  async createPayment() {
    const selectedDetails = this.paymentDetails.controls
      .filter((control: AbstractControl) => control.get('selected')?.value)
      .map((control: AbstractControl) => ({
        patientTreatmentDetailId: control.get('id')?.value,
        amount: control.get('realPrice')?.value,
      }));

    const requestData: Partial<CreatePaymentDto> = {
      ...this.form.value.receipt,
      details: selectedDetails
    };

    try {
      const response = await this._paymentService.createPayment(requestData);
      if (response && response.code === 200) {
        this._snackBarService.open('Pago realizado con éxito', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.stepper.reset();
        this.form.reset();
        this.totalAmount = 0;
      } else {
        throw new Error('Error en el pago');
      }
    } catch (error) {
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

  async returnPage() {
    this._router.navigateByUrl("/payment/list");
  }
}
