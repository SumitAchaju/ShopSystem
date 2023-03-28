import { checkDate } from "./getDate";

export function filterBillDate(bill, duration) {
  const data = bill.filter((item) => checkDate(item.date, duration) === true);
  return data;
}

export function filterBillCustomDate(bill, date, mode) {
  date.forEach((item, i) => {
    date[i] = Number(item);
  });
  const data = bill.filter((item) => {
    const dateList = item.date.split("-");
    dateList.forEach((item, i) => {
      dateList[i] = Number(item);
    });
    if (mode === "day") {
      return (
        dateList[0] === date[0] &&
        dateList[1] === date[1] &&
        dateList[2] === date[2]
      );
    } else if (mode === "month") {
      return dateList[0] === date[0] && dateList[1] === date[1];
    } else if (mode === "year") {
      return dateList[0] === date[0];
    }
  });
  return data;
}
