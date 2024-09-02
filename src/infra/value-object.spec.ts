import { ValueObject } from 'src/infra/value-object';

class TestValueObject extends ValueObject {
  constructor(public readonly value: any) {
    super();
  }
}

describe('ValueObject Unit Tests', () => {
  it('should return false when comparing with null or undefined', () => {
    const vo1 = new TestValueObject('test');

    expect(vo1.equals(null)).toBe(false);
    expect(vo1.equals(undefined)).toBe(false);
  });

  it('should return false when comparing with an object of different class', () => {
    const vo1 = new TestValueObject('test');
    const vo2 = { value: 'test' }; // different class

    expect(vo1.equals(vo2 as any)).toBe(false);
  });

  it('should return true when comparing with an object of the same class and same value', () => {
    const vo1 = new TestValueObject('test');
    const vo2 = new TestValueObject('test');

    expect(vo1.equals(vo2)).toBe(true);
  });

  it('should return false when comparing with an object of the same class but different value', () => {
    const vo1 = new TestValueObject('test1');
    const vo2 = new TestValueObject('test2');

    expect(vo1.equals(vo2)).toBe(false);
  });

  it('should return true when comparing two objects with deep equality', () => {
    const vo1 = new TestValueObject({ field1: 'value1', field2: 'value2' });
    const vo2 = new TestValueObject({ field1: 'value1', field2: 'value2' });

    expect(vo1.equals(vo2)).toBe(true);
  });

  it('should return false when comparing two objects with deep inequality', () => {
    const vo1 = new TestValueObject({ field1: 'value1', field2: 'value2' });
    const vo2 = new TestValueObject({ field1: 'value1', field2: 'value3' });

    expect(vo1.equals(vo2)).toBe(false);
  });
});
