import _ from 'lodash';

export function convertObjectsToArray(objects, ignoreProperty) {
  return _.transform(_.omit(objects, ignoreProperty), (result, value, key) => {
    value['name'] = key;
    result.push(value);
  }, []);
}

export function delayFunction(fn) {
  const time = 333;
  window.setTimeout(fn, time);
}