import { InvalidUuidError, Uuid } from './uuid.vo';

describe('Uuid Unit Tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  it('should throw an error if the id is not a valid UUID', () => {
    const invalidUuid = 'invalid-uuid';
    expect(() => new Uuid(invalidUuid)).toThrow(InvalidUuidError);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a new UUID', () => {
    const uuid = new Uuid();

    expect(uuid.id).toBeDefined();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a new UUID with the provided id', () => {
    const uuid = new Uuid('f0b3c2b1-8a5b-4d4b-8c7b-6b1b7d5c4e1f');

    expect(uuid.id).toBe('f0b3c2b1-8a5b-4d4b-8c7b-6b1b7d5c4e1f');
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should be valid if the id is a valid UUID', () => {
    const validUuid = 'f0b3c2b1-8a5b-4d4b-8c7b-6b1b7d5c4e1f';
    const uuid = new Uuid(validUuid);

    expect(uuid.id).toBe(validUuid);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should validate the UUID', () => {
    new Uuid();

    expect(validateSpy).toHaveBeenCalled();
  });
});
