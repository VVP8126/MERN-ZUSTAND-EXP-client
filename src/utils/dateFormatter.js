import { DateTime } from 'luxon';

const format = (unformatted) => {
  return DateTime.fromISO(unformatted).toLocaleString(DateTime.DATE_SHORT);
};

export default format;
