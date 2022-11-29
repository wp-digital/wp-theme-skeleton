import Calc from './Calc';

describe('Calc addition', () => {
  const instance = new Calc();

  it('should add 2 ints', () => {
    expect(instance.add(2, 4)).toBe(6);
  });

  it('should add 2 ints as strings', () => {
    expect(instance.add('2', '4')).toBe(6);
  });

  it('should add int and string', () => {
    expect(instance.add(2, '4')).toBe(6);
  });
});
