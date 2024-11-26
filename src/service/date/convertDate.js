let monthsArray = [
  "0",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function convertDate(date, dateOnly = false) {
  const dateTime = new Date(date);
  let hr = dateTime.getHours();
  let min = dateTime.getMinutes();
  let day = dateTime.getDate();
  let month = dateTime.getMonth() + 1;
  let year = dateTime.getFullYear();
  let noon = "AM";

  if (hr > 12) {
    hr = hr - 12;
    noon = "PM";
  }
  if (min < 10) {
    min = `0${min}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  if (dateOnly) {
    return `${day} ${monthsArray[month]} ${year}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${hr}:${min} ${noon}, ${day}/${month}/${year}`;
}
