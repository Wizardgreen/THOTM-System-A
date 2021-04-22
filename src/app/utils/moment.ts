import * as _moment from 'moment';

export function moment(dateString: string): _moment.Moment {
  return _moment(dateString);
}

export function isValidDate(dateString: string): boolean {
  return _moment(dateString).isValid();
}

export function willExpireIn7Days(dateString: string): boolean {
  const now = _moment();
  return _moment(dateString).add(7, 'days').isBefore(now);
}

export function isExpired(dateString: string): boolean {
  const now = _moment();
  return _moment(dateString).isBefore(now);
}
