import globalPoi from './globalPoi';

function getCenter(name) {
  if (globalPoi[name]) {
    return globalPoi[name].pos;
  }
  return globalPoi['中国'].pos;
}

export default getCenter;
