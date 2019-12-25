import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../../common/error-state-matcher';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
        'emailFormControl': this.emailFormControl,
        'passwordFormControl': this.passwordFormControl
      }
    );
  }

  loginUser() {
    this.auth.login(
      this.loginForm.value.emailFormControl,
      this.loginForm.value.passwordFormControl
    ).subscribe(data => {
        this.auth.saveToken(data.id_token);
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
