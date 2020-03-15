
function cleanData(data) {
  return {
    confirmedNum: data.confirmedNum || 0,
    deathsNum: data.deathsNum || 0,
    curesNum: data.curesNum || 0,
  };
}

export function getGlobalData(data) {
  const { world, nationTotal } = data;
  const globalTotal = {
    confirmed: 0,
    death: 0,
    cured: 0,
  };
  let list = [];
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
  list = list.filter(item => item.confirmedNum || item.deathsNum || item.curesNum);
  list.forEach((item) => {
    const temp = cleanData(item);
    globalTotal.confirmed += temp.confirmedNum;
    globalTotal.death += temp.deathsNum;
    globalTotal.cured += temp.curesNum;
  });
  return { globalTotal, list };
}

export default {};
