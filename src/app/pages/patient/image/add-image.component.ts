import {Component} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { Injectable } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
    selector: 'add-image',
    templateUrl: 'add-image.component.html',
    
})

export class AddImage {
  public previsualizacion!: string;
  public archivos!: any;
  public loading!: boolean;
  capturedImage: string | null = null;
  constructor(public dialogRef: MatDialogRef<AddImage>, private sanitizer: DomSanitizer, private PatientService: PatientService) {}

  capturarFile(event:any): any {
    const MAXIMO_TAMANIO_BYTES = 100000000;
    let archivoCapturado = event.target.files[0];

    if (archivoCapturado.size > MAXIMO_TAMANIO_BYTES) {
      const tamanioEnMb = MAXIMO_TAMANIO_BYTES / 1000000;
      //alert(`El tamaño máximo es ${tamanioEnMb} MB`);
      //this.subir.reset();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tamaño de foto incorrecto, por favor verifique que la foto pese menos de 4MB',
      });
      // Limpiar
      //foto = "";
    } else {
      archivoCapturado = event.target.files[0];
      console.log('archivo cap', archivoCapturado)
      this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      this.PatientService.capturedImage = imagen.base;
      //localStorage.setItem('base64',imagen.base)
      //console.log('asss', imagen);
    })
    this.archivos = archivoCapturado;
    // console.log('archivos', this.archivos)
    }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
        console.log('resolve',resolve)
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return resolve;
    } catch (e) {
      return null;
    }
  })
}