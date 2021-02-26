import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ready = false;
  dataSource = new MatTableDataSource<MemberInfoType>();
  dataLength: number;
  columnsToDisplay: string[] = [
    'id',
    'name',
    'nickname',
    'lineId',
    'program',
    'programExpiryDate',
    'storage',
    'note',
    'view',
  ];

  constructor(private router: Router, private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db
      .list('member')
      .valueChanges()
      .subscribe((data: MemberInfoType[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataLength = data.length;
        this.dataSource.sort = this.sort;
        this.ready = true;
      });

    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const matchedName = data.name.toLocaleLowerCase().indexOf(filter) !== -1;
      const matchedNickName =
        data.nickname.toLocaleLowerCase().indexOf(filter) !== -1;
      return matchedNickName || matchedName;
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  viewMember(memberID: string): void {
    this.router.navigate(['member-list', memberID]);
  }
}
