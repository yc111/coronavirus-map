import moment from 'moment';

export function getCurentDate() {
  const current = moment();
  let end = current.format('YYYY-MM-DD');
  if (current.hour() < 9) {
    end = current.add(-1, 'd').format('YYYY-MM-DD');
  }
  return end;
}

export function genDateList(start) {
  let d = moment(start);
  const dates = [];
  const end = getCurentDate();

  dates.push(start);
  while (d < moment(end)) {
    d = d.add(1, 'd');
    dates.push(d.format('YYYY-MM-DD'));
  }

  // console.log(dates);
  return dates;
}

export default genDateList;
