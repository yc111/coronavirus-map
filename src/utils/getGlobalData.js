
export function getGlobalData(data) {
  const { world, nationTotal } = data;
  const globalTotal = {
    confirmed: 0,
    death: 0,
    cured: 0,
  };
  const list = [];
  const chinaData = {
    name: '中国',
    confirmedNum: nationTotal.confirmedTotal,
    deathsNum: nationTotal.deathsTotal,
    curesNum: nationTotal.curesTotal,
  };
  const newWorld = world.map(country => ({
    name: country.name,
    confirmedNum: country.confirmedNum,
    deathsNum: country.deathsNum,
    curesNum: country.curesNum,
  }));
  list.push(...newWorld);
  list.push(chinaData);
  list.sort((a, b) => b.confirmedNum - a.confirmedNum);
  list.forEach((item) => {
    globalTotal.confirmed += item.confirmedNum;
    globalTotal.death += item.deathsNum;
    globalTotal.cured += item.curesNum;
  });
  return { globalTotal, list };
}

export default {};
