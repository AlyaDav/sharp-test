import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DataService } from '../../common/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserList } from '../../common/interfaces/IUserList';
import { ITransaction } from '../../common/interfaces/ITransaction';

@Component({
  selector: 'app-new-transaction-dialog',
  templateUrl: './new-transaction-dialog.component.html',
  styleUrls: ['./new-transaction-dialog.component.css']
})
export class NewTransactionDialogComponent implements OnInit {
  userListOptions: IUserList[];
  searchForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewTransactionDialogComponent>,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ITransaction
  ) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
        'name': new FormControl(this.data.username ? this.data.username : '', Validators.required),
        'amount': new FormControl(this.data.amount ? this.data.amount : '', Validators.required)
      }
    );
  }

  inputName(event) {
    let value = event.target.value;
    if (value) {
      this.dataService.usersList(event.target.value).subscribe((data: IUserList[]) => {
          this.userListOptions = data;
        },
        error => {
          this.userListOptions = [];
        });
    } else {
      this.userListOptions = [];
    }
  }

  submit() {
    this.dataService.createTransaction(
      this.searchForm.value.name,
      this.searchForm.value.amount
    ).subscribe(
      data => {
        this.snackBar.open('Successfully!', null, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.dialogRef.close(true);
      }, error => {
        this.snackBar.open(error.error, null, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      });
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  keyDown(event) {
    const charCode = (event.which) ? event.which : event.keyCode;

    return !(charCode > 31 && (
      (charCode < (this.searchForm.value.amount ? 48 : 49) || charCode > 57) &&
      (charCode < (this.searchForm.value.amount ? 96 : 97) || charCode > 105)
    ));
  }
}
