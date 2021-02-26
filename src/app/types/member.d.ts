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
  program: string;
  storage: string[] | string;
}
