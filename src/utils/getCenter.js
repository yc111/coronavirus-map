import globalPoi from './globalPoi';

function getCenter(name) {
  if (globalPoi[name]) {
    return globalPoi[name].pos;
  }
  return null;
}

export default getCenter;
