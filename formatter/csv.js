const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const lodash = require("lodash");
const { keyBy } = lodash;
const results = [];
const absolutePath = path.join(__dirname, "B.csv");

fs.createReadStream(absolutePath)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    // console.log(formatter(results));
    pbcopy(JSON.stringify(formatter(results)));
    console.log("Done!");
  });

const pbcopy = (data) => {
  const proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
};

const program = [
  { label: "丘主", value: "HL" },
  { label: "有志之士", value: "MA" },
  { label: "戰地元帥", value: "FM" },
  { label: "禁軍統領", value: "GG" },
  { label: "菁英指揮官", value: "EC" },
  { label: "見習指揮官", value: "OC" },
  { label: "游擊隊指揮官", value: "GO" },
];

const formatDate = (dateString) => {
  if (dateString === "無") return "";
  return dateString ? dateString.replace(new RegExp("[.]", "g"), "-") : "";
};
const formatter = (parsedCsv) => {
  return keyBy(
    parsedCsv.map((info) => {
      const programID = program.find(({ label }) => {
        return label === info.月繳方案;
      }).value;
      const currentProgram = {
        id: programID,
        start: "-",
        end: programID === "GO" || programID === "HL" ? "-" : info.方案到期日,
      };
      return {
        birthday: formatDate(info.出生日),
        email: info.Email,
        // expiryDate: formatDate(info.方案到期日),
        id: info.內環編號,
        city: info.現居住地,
        hasCard: info.會員卡 === "已領" ? true : false,
        joinDate: formatDate(info.入會日期),
        journeyBeing: info.征途之始成就,
        lineId: info["Line ID"],
        name: info.姓名,
        nickname: info.暱稱,
        note: info.備註,
        phone: info.電話 ? info.電話.slice(1) : "",
        storage: info.櫃位,
        program: {
          current: currentProgram,
          history: [
            {
              sort: 0,
              ...currentProgram,
            },
          ],
        },
        game: {
          wh40k: info["戰鎚 40K"],
          killteam: info.殺戮小隊,
          necromunda: info.巢都世界,
          whaos: info.西格瑪紀元,
          warcry: info.戰吼,
          underworld: info.冥土世界,
          infinity: info.無限戰爭,
          malifaux: info.噩夢鎮,
          monsterPocalypse: info.巨獸啟示錄,
          warMachineAndHordes: info["戰爭機器&部落"],
        },
      };
    }),
    "id"
  );
};
