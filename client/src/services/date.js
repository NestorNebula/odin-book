import {
  differenceInCalendarYears,
  differenceInHours,
  format,
  formatDistanceToNowStrict,
} from 'date-fns';

const getDate = (date) => {
  const now = new Date(Date.now());
  if (differenceInHours(now, date) >= 24) {
    if (differenceInCalendarYears(now, date)) {
      return format(date, 'MMM d, yyyy');
    } else {
      return format(date, 'MMM d');
    }
  } else {
    const distance = formatDistanceToNowStrict(date).split(' ');
    distance[1] = distance[1][0];
    return distance.join('');
  }
};

const getFullDate = (date) => {
  return format(date, 'p ・ MMM d, yyyy');
};

export { getDate, getFullDate };
