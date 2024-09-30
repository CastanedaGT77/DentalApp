import { NgModule } from "@angular/core";
import { HasPermissionDirective } from "./directives/has-permission.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        HasPermissionDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HasPermissionDirective
    ]
})
export class SharedModule {}