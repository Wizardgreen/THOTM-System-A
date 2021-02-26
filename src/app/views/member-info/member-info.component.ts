import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
})
export class MemberInfoComponent implements OnInit {
  basicInfo = new FormGroup({
    name: new FormControl(''),
    nickName: new FormControl(''),
    birthday: new FormControl(''),
    city: new FormControl(''),
    lineId: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    program: new FormControl(''),
    joinDate: new FormControl(''),
    hasCard: new FormControl(false),
  });
  modified = false;
  ready = false;
  memberID = '';
  memberInfo: MemberInfoType;
  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => (this.memberID = param.id));
    this.fetchMemberInfo();
  }

  fetchMemberInfo(): void {
    this.db
      .object(`member/${this.memberID}`)
      .valueChanges()
      .subscribe((data: MemberInfoType) => {
        this.memberInfo = data;
        this.ready = true;
      });
  }
}
