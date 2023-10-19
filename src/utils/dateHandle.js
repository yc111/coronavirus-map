import moment from 'moment';

const excludeDates = ['2020-04-22', '2020-04-23', '2020-04-24'];

export function getEndDate() {
  // 数据截止到 2020.10.21
  const now = new Date().getTime();
  const end = new Date('2020.10.21').getTime();
  if (now > end) {
    return '2020-10-21';
  }

  const current = moment();
  let formatCurrent = current.format('YYYY-MM-DD');
  if (current.hour() < 9) {
    formatCurrent = current.add(-1, 'd').format('YYYY-MM-DD');
  }
  return formatCurrent;
}

export function genDateList(start) {
  let d = moment(start);
  const dates = [];
  const end = getEndDate();

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
