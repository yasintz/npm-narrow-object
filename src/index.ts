import { isObject, isArray } from './utils';

interface Unordered extends Record<string, any> {
  toString: () => string;
}

function getKey(key: string, parentKey?: string) {
  if (typeof parentKey === 'string' && parentKey) {
    return `${parentKey}.${key}`;
  }
  return key;
}

function narrowObject(
  obj: Record<string, any>,
  parentKey?: string
): Record<string, string | number | boolean | null | undefined | void> & {
  toString: () => string;
} {
  const unordered: Unordered = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (isObject(value) || isArray(value)) {
      Object.assign(unordered, narrowObject(value, getKey(key, parentKey)));
    } else {
      unordered[getKey(key, parentKey)] = value;
    }
  });

  unordered.toString = () => narrowToString(unordered);

  return unordered;
}

function narrowToString(unordered: any): string {
  const result: Record<string, any> = {};
  Object.keys(unordered)
    .sort()
    .forEach(function(key) {
      result[key] = unordered[key];
    });

  return JSON.stringify(result);
}

export default narrowObject;
