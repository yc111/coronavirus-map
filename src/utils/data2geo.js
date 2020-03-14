import globalPois from './globalPoi';

function cleanDatas(input) {
  return {
    confirmedNum: input.confirmedNum || 0,
    suspectedNum: input.suspectedNum || 0,
    curesNum: input.curesNum || 0,
    deathsNum: input.deathsNum || 0,

    confirmedIncr: input.confirmedIncr || 0,
    deathsIncr: input.deathsIncr || 0,
    curesIncr: input.curesIncr || 0,
  };
}

function GEOTEMP() {
  const features = [];
  return {
    type: 'FeatureCollection',
    features,
  };
}

function dataToGeo(datas) {
  const countriesGeo = GEOTEMP();
  const provincesGeo = GEOTEMP();
  const provincesExtendGeo = GEOTEMP();
  const citiesGeo = GEOTEMP();
  // if a country have no sub the country is the leaf, so do cities, provinces, get all the leaf noods for heatmap
  const leafRootGeo = GEOTEMP();
  const { world = [], provinces = [], nationTotal = {} } = datas;
  const china = {
    name: '中国',
    confirmedNum: nationTotal.confirmedTotal,
    suspectedNum: nationTotal.suspectedTotal,
    curesNum: nationTotal.curesTotal,
    deathsNum: nationTotal.deathTotal,
    states: provinces,
  };
  world.push(china);
  const Geos = [countriesGeo, provincesGeo, citiesGeo];
  const subTypeNames = ['country', 'states', 'cities'];
  // stores all the unknown leaf
  function pushStack(list, parentInfo) {
    const { poiList, level, parentLevelInfo } = parentInfo;
    list.forEach((item) => {
      const levelNames = JSON.parse(JSON.stringify(parentInfo.levelNames));
      const { name } = item;
      let {
        confirmedNum, suspectedNum, curesNum, deathsNum, confirmedIncr, deathsIncr, curesIncr,
      } = cleanDatas(item);
      const poiInfo = poiList[name];
      const type = subTypeNames[level];
      const subType = subTypeNames[level + 1];
      const subItem = item[subType];
      const targetObj = Geos[level];

      let pos;
      let unknownPos;
      let isLeaf = false;
      let hasSub = false;

      if (poiInfo) {
        // the point in the list
        pos = poiInfo.pos.concat(0.0);
        unknownPos = false;
        const nextPoiList = poiInfo[subType];

        if (subItem) {
          hasSub = true;
          levelNames.push(name);
          if (!nextPoiList) {
            console.warn(levelNames, 'has subs', name, 'but we can not get the poi info of next level');
          } else {
            pushStack(subItem, {
              level: level + 1,
              levelNames,
              poiList: nextPoiList,
              parentLevelInfo: poiInfo,
            });
          }
        } else {
          isLeaf = true;
        }
      } else {
        // if the point is not in the list
        if (parentLevelInfo) {
          unknownPos = true;
          pos = parentLevelInfo.pos.concat(0.0);
          isLeaf = true;
        } else {
          pos = null;
        }
        // for debug: print out the unmatched pos
        // @ts-ignore
        // config.isDebug &&
        console.warn('name is not in the list', level, JSON.stringify(levelNames), name);
      }
      //
      if (pos) {
        confirmedNum = Number(confirmedNum || 0);
        suspectedNum = Number(suspectedNum || 0);
        curesNum = Number(curesNum || 0);
        deathsNum = Number(deathsNum || 0);
        confirmedIncr = Number(confirmedIncr || 0);
        deathsIncr = Number(deathsIncr || 0);
        curesIncr = Number(curesIncr || 0);
        const geoData = {
          type: 'Feature',
          properties: {
            name, confirmedNum, suspectedNum, curesNum, deathsNum, confirmedIncr, deathsIncr, curesIncr, type, unknownPos,
          },
          geometry: { type: 'Point', coordinates: pos },
        };
        targetObj.features.push(geoData);
        if (isLeaf) {
          leafRootGeo.features.push(geoData);
        }
        // for extend
        if ((level === 0 && !hasSub) || level === 1) {
          provincesExtendGeo.features.push(geoData);
        }
      }
    });
  }

  pushStack(world, { level: 0, poiList: globalPois, levelNames: [] });

  // Since we use the parent's position for unknown locations,(eg. if we can't find the position of Japan.abc we will use Japan's location for abc)
  // Thus all the unknown locaiton's position for same father will same, this makes some layer looks have a lot of repeating points
  // To fix this we joined all the same position together.
  const tmpJoinMap = {};
  leafRootGeo.features.forEach((feature) => {
    const key = feature.geometry.coordinates.join(',');
    tmpJoinMap[key] = tmpJoinMap[key] || JSON.parse(JSON.stringify(feature));
    tmpJoinMap[key].properties.name = '--';
    tmpJoinMap[key].properties.confirmedNum += feature.properties.confirmedNum;
    tmpJoinMap[key].properties.suspectedNum += feature.properties.suspectedNum;
    tmpJoinMap[key].properties.curesNum += feature.properties.curesNum;
    tmpJoinMap[key].properties.deathsNum += feature.properties.deathsNum;
    tmpJoinMap[key].properties.confirmedIncr += feature.properties.confirmedIncr;
    tmpJoinMap[key].properties.deathsIncr += feature.properties.deathsIncr;
    tmpJoinMap[key].properties.curesIncr += feature.properties.curesIncr;
  });
  const newFeatures = Object.keys(tmpJoinMap).map(key => tmpJoinMap[key]);
  const leafRootGeoJoin = {
    type: 'FeatureCollection', features: newFeatures,
  };
  //

  return {
    countriesGeo, provincesGeo, provincesExtendGeo, citiesGeo, leafRootGeo, leafRootGeoJoin,
  };
}


export default dataToGeo;
