export const PaidProgramMap: IdentityType = {
  FM: { viewValue: '戰地元帥', value: 'FM' },
  GG: { viewValue: '禁軍統領', value: 'GG' },
  EC: { viewValue: '菁英指揮官', value: 'EC' },
  OC: { viewValue: '見習指揮官', value: 'OC' },
  GO: { viewValue: '游擊隊指揮官', value: 'GO' },
};

export const FreeProgramMap: IdentityType = {
  CHOSEN: { viewValue: '神選', value: 'CHOSEN' },
  NEW: { viewValue: '新會員體驗期', value: 'NEW' },
};

export const StaffMap: IdentityType = {
  MANAGER: { viewValue: '林務管理員', value: 'MANAGER' },
  WORKER: { viewValue: '林務巡守員', value: 'WORKER' },
};

export const IdentityMap: IdentityType = {
  ...PaidProgramMap,
  ...FreeProgramMap,
  ...StaffMap,
};

export const LocationList: Location[] = [
  {
    groupName: '中部地區',
    list: ['臺中市', '彰化縣', '南投縣'],
  },
  {
    groupName: '北部地區',
    list: [
      '臺北市',
      '新北市',
      '桃園市',
      '基隆市',
      '新竹縣',
      '新竹市',
      '苗栗縣',
    ],
  },
  {
    groupName: '南部地區',
    list: ['雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣'],
  },
  {
    groupName: '東部地區',
    list: ['宜蘭縣', '花蓮縣', '臺東縣'],
  },
  {
    groupName: '離島地區',
    list: ['澎湖縣', '金門縣', '連江縣'],
  },
];

interface Location {
  groupName: string;
  list: string[];
}

interface IdentityType {
  [key: string]: {
    viewValue: string;
    value: string;
  };
}
