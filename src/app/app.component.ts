import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ErrorStateMatcher, MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-material-form-controls';

  email = new FormControl('', [Validators.required, Validators.email]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  getErrorMessage() {
    let errorMessage = '';

    if (this.email.hasError('required')) {
      errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      errorMessage = 'Not a valid email';
    }

    return errorMessage;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
