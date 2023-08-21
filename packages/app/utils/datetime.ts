type Timestamp = string | number;

const getDateFromTimeStamp = (timeStamp: Timestamp) =>
  new Date(Number(timeStamp) * 1000);

export const dateToUnixTimestamp = (date: Date) =>
  Math.round(date.getTime() / 1000);

export const currentTimestampInSeconds = dateToUnixTimestamp(new Date());

//eg.  "1st of June"
export const formatTimestampToDateWithSuffix = (timestamp: Timestamp) => {
  const date = getDateFromTimeStamp(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  // Format day with appropriate suffix
  let daySuffix;
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  const readableDate = `${day}${daySuffix} of ${month}`;
  return readableDate;
};

//eg.  "1 Jun 23, 6:47 PM"
export const formatTimestampToDateWithTime = (timestamp: Timestamp) => {
  const date = getDateFromTimeStamp(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear() % 100; // Get the last two digits of the year
  const hours = date.getHours();

  const minute = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const hoursEnFormat = hours % 12 === 0 ? 12 : hours % 12;

  const formattedDate = `${day} ${month} ${year}, ${hoursEnFormat}:${minute
    .toString()
    .padStart(2, "0")} ${amPm}`;
  return formattedDate;
};

//eg.  "1 Jun, 23"
export const formatTimestampToDate = (timestamp: Timestamp) => {
  const date = getDateFromTimeStamp(timestamp);
  return formatDate(date);
};

//eg.  "1 week" | "2 weeks"
export const formatFrequencyHours = (hours: number) => {
  const oneDayInHours = 24;
  const oneWeekInHours = oneDayInHours * 7;
  const oneMonthInHours = oneWeekInHours * 4;

  const lessThanADay = hours < oneDayInHours;
  const lessThanAWeek = hours < oneWeekInHours;
  const lessThanAMonth = hours < oneMonthInHours;

  const days = Math.floor(hours / oneDayInHours);
  const weeks = Math.floor(hours / oneWeekInHours);
  const months = Math.floor(hours / oneMonthInHours);

  if (lessThanADay) {
    return frequencyString({ name: "hour", number: hours });
  } else if (lessThanAWeek) {
    return frequencyString({ name: "day", number: days });
  } else if (lessThanAMonth) {
    return frequencyString({ name: "week", number: weeks });
  } else {
    return frequencyString({ name: "month", number: months });
  }
};

//eg.  "1 day" | "4 days"
const frequencyString = ({ name, number }: { name: string; number: number }) =>
  `${number} ${number === 1 ? name : name.concat("s")}`;

// eg.  "1 Jun, 23"
export const formatDate = (date: Date | string) => {
  date = new Date(date);
  const day = new Date(date).getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};
