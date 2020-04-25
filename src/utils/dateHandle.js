import moment from 'moment';

const excludeDates = ['2020-04-22', '2020-04-23', '2020-04-24'];

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

  excludeDates.forEach((date) => {
    dates.remove(date);
  });

  // console.log(dates);
  return dates;
}

Array.prototype.remove = function r(item) {
  const index = this.indexOf(item);
  if (index > -1) {
    this.splice(index, 1);
  }
};

export default genDateList;
