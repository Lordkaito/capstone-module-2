import itemCalculator from './calculate.js';

describe('Tests the item counter function', () => {
  test('', () => {
    const itemArray = [1, 2, 3];
    const length = itemCalculator(itemArray);
    expect(length).toBe(3);
  });
});
