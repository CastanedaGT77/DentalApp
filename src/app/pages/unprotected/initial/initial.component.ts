import { Component } from '@angular/core';
import { InitialService } from './initial.service';

@Component({
    selector: "initial-test",
    templateUrl: "./initial.component.html"
})
export class InitialComponent {
    
    constructor(
        private readonly _initialService: InitialService
    ){}

    async ngOnInit(){
        const response = await this._initialService.test();
        console.log("RESPONSE:", response);
    }
}