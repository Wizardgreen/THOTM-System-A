import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { rules, qrCodeList } from './setting';
import { LocationList, ProgramMap } from '@utils/maps';

const createMemberData = () => ({
  birthday: '',
  city: '',
  email: '',
  expiryDate: '',
  game: {},
  hasCard: '',
  id: '',
  joinDate: '',
  journeyBeing: '',
  lineId: '',
  name: '',
  nickname: '',
  note: '',
  phone: '',
  program: '',
  storage: '',
});
const profileValidation: ValidatorFn = (control) => {
  const name = control.get('name').value;
  const lineId = control.get('lineId').value;
  const phone = control.get('phone').value;

  if (name && lineId && phone) {
    return null;
  }

  return { required: true };
};

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss'],
})
export class MemberCreateComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  memberObjectRef: AngularFireObject<{ [key: string]: MemberInfoType }>;
  newMemberID: string;
  agreement = new FormControl(false, Validators.requiredTrue);
  today = new Date();
  birthDayStart = new Date(this.today.getFullYear() - 25, 1, 1);
  birthDayLimit = new Date(
    this.today.getFullYear() - 14,
    this.today.getMonth(),
    this.today.getDate() - 1
  );
  profile = this.fb.group(
    {
      name: ['', Validators.required],
      nickname: [''],
      birthday: [''],
      city: [''],
      lineId: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      joinDate: [this.today],
    },
    {
      validators: profileValidation,
    }
  );
  rules = rules;
  qrCodeList = qrCodeList;
  locationList = LocationList;

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.memberObjectRef = this.db.object('member');
    this.route.paramMap.pipe(map((params) => params.get('newID'))).subscribe({
      next: (value) => {
        if (value) {
          this.newMemberID = value;
        } else {
          this.router.navigate(['member-list']);
        }
      },
    });
  }

  onDateChange({ value }, fieldName: string): void {
    const formatDate = moment(value).format('YYYY-MM-DD');
    this.profile.patchValue({ [fieldName]: formatDate });
  }

  postNewMember(): void {
    const hasError = this.profile.errors?.required;

    if (hasError) {
      this.snackBar.open('還沒寫完唷', '關閉', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    const newProfile = {
      ...createMemberData(),
      ...this.profile.getRawValue(),
      program: {
        current: {
          id: ProgramMap.GO.value, // 基礎會員級別
          start: '-',
          end: '-',
        },
        history: [],
      },
    };
    this.memberObjectRef.update({ [this.newMemberID]: newProfile }).then(() => {
      this.stepper.next();
    });
  }
}
