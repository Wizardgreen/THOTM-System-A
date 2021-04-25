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
    if (process.argv.length === 3 && process.argv[2] === "--storage") {
      const ans = getStorageMap(results);
      pbcopy(JSON.stringify(ans));
      console.log(ans);
      console.log("Done! storage data is in the clipboard!");
      return;
    } else {
      const ans = getMemberList(results);
      pbcopy(JSON.stringify(ans));
      console.log(ans);
      console.log("Done!");
    }
  });

const pbcopy = (data) => {
  const proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
};

const formatDate = (dateString) => {
  if (dateString === "無") return "";
  return dateString ? dateString.replace(new RegExp("[.]", "g"), "-") : "";
};

const getMemberList = (parsedCsv) => {
  const programMap = {
    丘主: "HL",
    有志之士: "MA",
    戰地元帥: "FM",
    禁軍統領: "GG",
    菁英指揮官: "EC",
    見習指揮官: "OC",
    游擊隊指揮官: "GO",
  };
  return keyBy(
    parsedCsv.map((info) => {
      const programID = programMap[info.月繳方案] || "?";
      const isSpecialProgram = programID === "GO" || programID === "HL";
      const currentProgram = {
        id: programID,
        start: "-",
        end: isSpecialProgram ? "-" : info.方案到期日,
      };

      const historyProgram = isSpecialProgram
        ? []
        : [
            {
              sort: 0,
              ...currentProgram,
            },
          ];
      return {
        birthday: formatDate(info.出生日),
        email: info.Email,
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
        program: {
          current: currentProgram,
          history: historyProgram,
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

const getStorageMap = (parsedCsv) => {
  const storageMap = {};
  for (let i = 1; i < 29; i++) {
    const ID = `s${i < 10 ? `0${i}` : i}`;
    storageMap[ID] = {
      ID,
      endDate: "",
      startDate: "",
      memberID: "",
      memberName: "",
      memberNickname: "",
    };
  }

  const joinData = (n, info) => {
    const ID = `s${n.slice(1)}`;
    storageMap[ID] = {
      ID,
      endDate: info.櫃位到期日,
      startDate: info.櫃位開始日,
      memberID: info.內環編號,
      memberName: info.姓名,
      memberNickname: info.暱稱,
    };
  };
  parsedCsv.forEach((info) => {
    let cache;
    if (info.櫃位.includes(", ")) {
      cache = info.櫃位.split(", ");
      cache.forEach((n) => joinData(n, info));
      return;
    }
    if (info.櫃位.includes("、")) {
      cache = info.櫃位.split("、");
      cache.forEach((n) => joinData(n, info));
      return;
    }
    if (info.櫃位) {
      joinData(info.櫃位, info);
      return;
    }
  });

  return storageMap;
};
