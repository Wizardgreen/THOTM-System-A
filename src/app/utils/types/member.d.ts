declare interface MemberInfoType {
  birthday: string;
  city: string;
  email: string;
  expiryDate: string;
  game: {
    infinity: string[] | string;
    killteam: string[] | string;
    malifaux: string[] | string;
    monsterPocalypse: string[] | string;
    necromunda: string[] | string;
    underworld: string[] | string;
    warMachineAndHordes: string[] | string;
    warcry: string[] | string;
    wh40k: string[] | string;
    whaos: string[] | string;
  };
  hasCard: boolean;
  id: string;
  joinDate: string;
  journeyBeing: string;
  lineId: string;
  name: string;
  nickname: string;
  note: string;
  phone: string;
  program: ProgramType;
  storage: string[] | string;
}

interface ProgramType {
  current: ProgramRecordType;
  history: ProgramRecordType[];
}
interface ProgramRecordType {
  sort?: string;
  id: string;
  start: string;
  end: string;
}

declare enum ProgramEnum {
  丘主 = 'HL',
  有志之士 = 'MA',
  戰地元帥 = 'FM',
  禁軍統領 = 'GG',
  菁英指揮官 = 'EC',
  見習指揮官 = 'OC',
  游擊隊指揮官 = 'GO',
}
