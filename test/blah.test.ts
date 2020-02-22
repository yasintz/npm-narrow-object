import narrow from '../src';

const obj1 = narrow({
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
  key4: 'value4',
});
const obj2 = narrow({
  key4: 'value4',
  key2: 'value2',
  key3: 'value3',
  key1: 'value1',
});

describe('ToString', () => {
  it('works', () => {
    expect(obj1.toString()).toEqual(obj2.toString());
  });
});
