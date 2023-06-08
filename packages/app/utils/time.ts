export const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

export const formatTimestampToDate = (timestamp: string | number) => {
  const date = new Date(Number(timestamp) * 1000);

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
