export function getDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
    return currentDate;
  }

export function checkDate(date,check){
    let num;
    if(check==="week")  num = 7
    else if(check==="month") num = 30
    else if (check==="day") num = 1

    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - num);
    const dateToCheck = new Date(date);
    if (dateToCheck >= lastWeek && dateToCheck <= today) {
        return true
      } else {
        return false
      }
}
