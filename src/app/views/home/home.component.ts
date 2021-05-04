import { Component, OnInit } from '@angular/core';

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
  patchNoteList: PatchNoteType[] = [
    {
      title: '降級按鈕登場',
      date: '2021-05-05',
      details: [
        '會員資訊頁新增降級按鈕，用來將過期的會員降為免費會員級別，只會在付費時段超時候出現',
        '移除會員列表有個一多餘的"櫃位"欄位',
        '現在免費會籍也會記錄到會籍的歷史紀錄中了',
      ],
    },
    {
      title: '加入首頁、些許 UX 優化',
      date: '2021-05-02',
      details: [
        '新增了首頁作為登入後的預設畫面，目前僅有閱讀更新紀錄的功能',
        '左上角系統名稱可以連到首頁',
        '修正一個導致新會員編號不會顯示在列表的 Bug',
        '會員頁面改為一次預覽兩百筆資料 (為避免未來會員數過多導致資料仔入時間太長，仍得保留列表分頁功能)',
      ],
    },
    {
      title: '啟動系統！',
      date: '2021-04-24',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
