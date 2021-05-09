import { Component, OnInit } from '@angular/core';
import patchNote from './patchNote';

interface PatchNoteType {
  title: string;
  date: string;
  details?: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  patchNoteList: PatchNoteType[] = patchNote;

  constructor() {}

  ngOnInit(): void {}
}
