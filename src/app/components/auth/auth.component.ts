import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { IResponseReg } from '../../common/interfaces/IResponseReg';
import { MyErrorStateMatcher } from '../../common/error-state-matcher';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  repeatPasswordFormControl = new FormControl('', [
    Validators.required
  ]);
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.authForm = this.builder.group({
        'emailFormControl': this.emailFormControl,
        'usernameFormControl': this.usernameFormControl,
        'passwordFormControl': this.passwordFormControl,
        'repeatPasswordFormControl': this.repeatPasswordFormControl
      }, {
        validator: this.checkIfMatchingPasswords(
          'passwordFormControl',
          'repeatPasswordFormControl'
        )
      }
    );
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];

      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  registerUser() {
    this.authService.registerUser(
      this.authForm.value.usernameFormControl,
      this.authForm.value.passwordFormControl,
      this.authForm.value.emailFormControl
    ).subscribe((data: IResponseReg) => {
        this.authService.saveToken(data.id_token);
        this.router.navigate(['/pw']);
      }, error => {
        this.snackBar.open(error.error, null, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    );
  }
}
