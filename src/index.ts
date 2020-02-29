import { isObject, isArray } from './utils';

interface Ordered extends Record<string, any> {
  toString: () => string;
}

interface Options {
  parentKey?: string;
  ordered: Ordered;
  fromRecursive?: boolean;
}

function getKey(key: string, parentKey?: string) {
  if (typeof parentKey === 'string' && parentKey) {
    return `${parentKey}.${key}`;
  }
  return key;
}
const canBeOrder = (val: any) => isObject(val) || isArray(val);

function narrowObject(
  unordered: any,
  options: Options = { ordered: {} }
): Record<string, string | number | boolean | null | undefined | void> & {
  toString: () => string;
} {
  const { ordered, parentKey, fromRecursive } = options;

  if (!canBeOrder(unordered) && fromRecursive) {
    if (!parentKey) {
      throw new Error('unordered must be object or array');
    }

    ordered[parentKey] = unordered;

    return ordered;
  }
  for (let [key, value] of Object.entries(unordered)) {
    // INFO: mutate the ordered object.
    narrowObject(value, {
      ordered,
      fromRecursive: true,
      parentKey: getKey(key, parentKey),
    });
  }

  if (!fromRecursive) {
    ordered.toString = () => narrowToString(ordered);
  }

  return ordered;
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
