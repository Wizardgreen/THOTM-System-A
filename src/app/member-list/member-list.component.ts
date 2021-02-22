import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  items: Observable<any[]>;
  displayedColumns: string[] = [
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

  constructor(db: AngularFireDatabase) {
    this.items = db.list('member').valueChanges();
  }

  ngOnInit(): void {}
}
