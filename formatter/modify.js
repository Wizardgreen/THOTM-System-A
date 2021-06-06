const fs = require("fs");
const moment = require("moment");

const [, , type] = process.argv;

const extendStorageDate = (days) => {
  const name = "storage.json";
  const parsed = JSON.parse(fs.readFileSync(name).toString());
  const modify = (parsed) => {
    const cache = {};
    for (const key in parsed) {
      const { endDate, memberID } = parsed[key];

      if (memberID && moment(endDate).isAfter(moment("2021-05-15"))) {
        const newEnd = moment(endDate).add(days, "day").format("YYYY-MM-DD");
        cache[key] = { ...parsed[key], endDate: newEnd };
      } else {
        cache[key] = parsed[key];
      }
    }
    return cache;
  };
  fs.writeFileSync(name, JSON.stringify(modify(parsed)));
};

const extendMemberDate = (days) => {
  const name = "member.json";
  const parsed = JSON.parse(fs.readFileSync(name).toString());
  const modify = () => {
    const cache = {};
    for (const key in parsed) {
      const { program } = parsed[key];
      const endDate = program.current.end;
      const isVaild = endDate !== "-" && endDate;
      if (isVaild && moment(endDate).isAfter(moment("2021-05-15"))) {
        const newEnd = moment(endDate).add(days, "day").format("YYYY-MM-DD");
        const newCurrent = {
          ...parsed[key].program.current,
          end: newEnd,
        };
        const newHistory = program.history ? [...program.history] : [];
        newHistory[0] = {
          ...newCurrent,
          note: "05/15 covid-19 疫情加重而延後 45 天",
        };
        cache[key] = {
          ...parsed[key],
          program: {
            current: newCurrent,
            history: newHistory,
          },
        };
      } else {
        cache[key] = parsed[key];
      }
    }
    return cache;
  };
  fs.writeFileSync(name, JSON.stringify(modify(parsed)));
};

if (type === "-s") {
  extendStorageDate(21);
} else if (type === "-m") {
  extendMemberDate(21);
}
