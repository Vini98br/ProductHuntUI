import moment from "moment";
import { Moment } from "moment";

const isBeforeDay = (a: Moment, b: Moment) => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

  const aYear = a.year();
  const aMonth = a.month();

  const bYear = b.year();
  const bMonth = b.month();

  const isSameYear = aYear === bYear;
  const isSameMonth = aMonth === bMonth;

  if (isSameYear && isSameMonth) return a.date() < b.date();
  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
}

export default isBeforeDay;