import moment from 'moment';
import { DATE_FORMATTER } from '../constants';

export function getDateString(times) {
  if (/^\d{10}$/.test(times)) {
    return moment(times * 1000).format(DATE_FORMATTER);
  } else if (/^\d{13}$/.test(times)) {
    return moment(times).format(DATE_FORMATTER);
  }
  return times;
}
