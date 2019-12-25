import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilePwComponent } from './components/profile-pw/profile-pw.component';
import { AuthComponent } from './components/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './common/interceptors/interceptor';
import { NewTransactionDialogComponent } from './components/new-transaction-dialog/new-transaction-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfilePwComponent,
    AuthComponent,
    NewTransactionDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [{
    provide: ErrorStateMatcher,
    useClass: ShowOnDirtyErrorStateMatcher

  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    NewTransactionDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
