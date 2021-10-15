const commentCounter = require('../src/util.js');

describe('Tests the comment counter function', () => {
  test('counts how many comments are inside the array', () => {
    expect(commentCounter.commentCounter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(10);
    expect(commentCounter.commentCounter([])).toBe(0);
    expect(commentCounter.commentCounter([20, 'hello', 'world', '!'])).toBe(4);
  });

  test('is not null when empty', () => {
    expect(commentCounter.commentCounter([])).not.toBeNull();
    expect(commentCounter.commentCounter([])).not.toBeUndefined();
    expect(commentCounter.commentCounter([])).toBe(0);
  });

  test('accepts different array values', () => {
    expect(commentCounter.commentCounter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(10);
    expect(commentCounter.commentCounter(['a', 'b', 'c', 2, true, 65, 'd', 'e', 'f', 'g'])).toBe(10);
    expect(commentCounter.commentCounter(['a', 'b', 'c', 2, true, 65, 'd', 'e', 'f', 'g'])).not.toBeNull();
    expect(commentCounter.commentCounter(['a', 'b', 'c', 2, true, 65, 'd', 'e', 'f', 'g'])).not.toBeUndefined();
  })
});
