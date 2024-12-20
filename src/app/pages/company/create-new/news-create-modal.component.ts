import { Component, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-news-create-modal",
    templateUrl: "./news-create-modal.component.html"
})
export class NewsCreateModalComponent {
    newsForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<NewsCreateModalComponent>,
        private fb: FormBuilder
    ) {
        this.newsForm = this.fb.group({
            title: ["", [Validators.required]],
            description: ["", [Validators.required, Validators.minLength(10)]],
            date: [new Date().toISOString().substring(0, 10), [Validators.required]],
            image: ["https://via.placeholder.com/150", [Validators.required]]
        });
    }

    save() {
        if (this.newsForm.valid) {
            this.dialogRef.close(this.newsForm.value);
        }
    }

    close() {
        this.dialogRef.close();
    }
}
