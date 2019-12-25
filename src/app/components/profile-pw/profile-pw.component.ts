import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../common/services/data.service';
import { Router } from '@angular/router';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { NewTransactionDialogComponent } from '../new-transaction-dialog/new-transaction-dialog.component';
import { IUser } from '../../common/interfaces/IUser';
import { ITransaction } from '../../common/interfaces/ITransaction';
import { forkJoin } from 'rxjs';
import { IResponseReg } from '../../common/interfaces/IResponseReg';

@Component({
  selector: 'app-profile-pw',
  templateUrl: './profile-pw.component.html',
  styleUrls: ['./profile-pw.component.css']
})
export class ProfilePwComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog) {
  }

  userInfo: IUser;
  displayedColumns: string[] = ['date', 'username', 'amount', 'balance', 'select'];
  dataSource: MatTableDataSource<ITransaction>;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit() {
    this.getData();
  }

  getData() {
    forkJoin(
      this.dataService.getLoggedUserInfo(),
      this.dataService.getListAuthUserTransactions()
    ).subscribe(([userInfo, dataSource]) => {
      this.userInfo = userInfo;
      this.dataSource = new MatTableDataSource(dataSource);
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  openDialog(row?: ITransaction) {
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      width: '272px',
      data: row ? {username: row.username, amount: Math.abs(row.amount)} : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}
