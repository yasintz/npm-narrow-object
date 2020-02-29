/* eslint-disable no-useless-computed-key  */
import narrow from '../src';

const orderedObject = narrow({
  array: [0, 1, 2],
  object: { key: 'value' },
  nestedArray: [
    [0, 1, 2],
    [0, 1, 2],
  ],
  nestedObject: {
    object: { key: 'value' },
  },
  nestedObjectWithArray: {
    object: { key: 'value' },
    array: [0, 1, 2],
  },
});

delete orderedObject['toString'];

const result = {
  ['array.0']: 0,
  ['array.1']: 1,
  ['array.2']: 2,
  ['object.key']: 'value',
  ['nestedArray.0.0']: 0,
  ['nestedArray.0.1']: 1,
  ['nestedArray.0.2']: 2,
  ['nestedArray.1.0']: 0,
  ['nestedArray.1.1']: 1,
  ['nestedArray.1.2']: 2,
  ['nestedObject.object.key']: 'value',
  ['nestedObjectWithArray.object.key']: 'value',
  ['nestedObjectWithArray.array.0']: 0,
  ['nestedObjectWithArray.array.1']: 1,
  ['nestedObjectWithArray.array.2']: 2,
};

describe('Narrow Object', () => {
  it('works', () => {
    expect(orderedObject).toEqual(result);
  });
});
