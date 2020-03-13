
const LEVE_1 = '>1000人';
const LEVE_2 = '500-999人';
const LEVE_3 = '100-499人';
const LEVE_4 = '10-99人';
const LEVE_5 = '1-9人';

function getGeoCoordMap(featuresData) {
  // {"天津": [117.190182, 39.125596]}
  const geoCoordMap = {};
  featuresData.forEach((v) => {
    const { name } = v.properties;
    geoCoordMap[name] = v.properties.cp;
  });
  return geoCoordMap;
}

function convertProvinceDataWithCp(chinaJson, data) {
  // {name: "天津", value: [117.190182, 39.125596, 42]}
  const cpData = getGeoCoordMap(chinaJson.features);
  const newData = [];
  for (let i = 0; i < data.length; i += 1) {
    const { name } = data[i];
    newData.push({ name: data[i].name, value: cpData[name].concat(data[i].value) });
  }
  return newData;
}

function convertProvinceData(data) {
  // {name: "天津", value: [42, '10-99人']}
  const newData = [];
  for (let i = 0; i < data.length; i += 1) {
    const temp = data[i].value;
    let category = '';
    if (temp >= 1000) {
      category = LEVE_1;
    } else if (temp >= 500 && temp <= 999) {
      category = LEVE_2;
    } else if (temp >= 100 && temp <= 499) {
      category = LEVE_3;
    } else if (temp >= 10 && temp <= 99) {
      category = LEVE_4;
    } else if (temp >= 1 && temp <= 9) {
      category = LEVE_5;
    }
    newData.push({ name: data[i].name, value: [temp, category] });
  }
  return newData;
}

export {
  convertProvinceData,
  convertProvinceDataWithCp,
};
