import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { ProgramMap, LocationList } from '../../utils/maps';
@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
})
export class MemberInfoComponent implements OnInit {
  profile = this.fb.group({
    name: [''],
    nickname: [''],
    birthday: [''],
    city: [''],
    lineId: [''],
    phone: [''],
    email: [''],
    expiryDate: [''],
    joinDate: [''],
    hasCard: [false],
  });

  programHeader = ['sort', 'id', 'start', 'end'];
  currentProgram: ProgramRecordType = { id: '', end: '', start: '' };
  historyProgram: ProgramRecordType[] = [];

  locationList = LocationList;
  programList = Object.values(ProgramMap);
  ready = false;
  memberRef: AngularFireObject<MemberInfoType>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.memberRef = this.db.object(`member/${param.id}`);
      this.fetchMemberInfo();
    });
  }

  fetchMemberInfo(): void {
    this.memberRef
      .valueChanges()
      .subscribe(({ program, ...other }: MemberInfoType) => {
        this.profile.patchValue(other);
        this.currentProgram = program.current;
        this.historyProgram = program.history.map(({ id, ...left }) => ({
          ...left,
          id: ProgramMap[id].viewValue,
        }));
        this.ready = true;
      });
  }

  updateMemberBasicInfo(): void {
    const data = this.profile.getRawValue();
    this.memberRef.update(data).then(() => {
      this.openSnackBar('修改成功', '關閉');
    });
  }

  onDateChange({ value }, fieldName: string): void {
    const formatDate = moment(value).format('YYYY-MM-DD');
    this.profile.patchValue({ [fieldName]: formatDate });
    // if (this.basicInfoModified === false) {
    //   this.basicInfoModified = true;
    // }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
