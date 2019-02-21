import moment from 'moment';
import { DATE_FORMATTER } from '../constants';

export function getDateString(times, FORMATTER = DATE_FORMATTER) {
  if (/^\d{10}$/.test(times)) {
    return moment((+times) * 1000).format(FORMATTER);
  } else if (/^\d{13}$/.test(times)) {
    return moment(times).format(FORMATTER);
  } else if (!times) {
    return '';
  }
  return times;
}
