import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
    selector: "app-calendar",
    templateUrl: "./calendar.component.html"
})
export class CalendarComponent implements OnInit, AfterViewInit {



    async ngOnInit(){
       
    }


    ngAfterViewInit() {
    }

}