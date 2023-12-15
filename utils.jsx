export function timeConvert(datePosted) {
  const old = new Date(`${datePosted}`);
  const today = new Date();

  const differenceInSeconds = Math.floor((today - old) / 1000);

  const minutesDifference = Math.floor(differenceInSeconds / 60);

  if (minutesDifference < 60) {
    return `${minutesDifference} minute${
      minutesDifference !== 1 ? "s" : ""
    } ago`;
  } else if (minutesDifference < 1440) {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  } else {
    const daysDifference = Math.floor(minutesDifference / 1440);
    if (daysDifference < 365) {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
    } else {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${yearsDifference} year${yearsDifference !== 1 ? "s" : ""} ago`;
    }
  }
}
