import Validator from './validator';

describe('test validator', () => {
  describe('isPhoneNumber', () => {
    test('isPhoneNumber not valid data - not number ', () => {
      expect(new Validator('sdfdfdf').isPhoneNumber()).toBe(false);
    });

    test('isPhoneNumber not valid data - not correct phone number ', () => {
      expect(new Validator('34535345345345').isPhoneNumber()).toBe(false);
    });

    test('isPhoneNumber not valid data - not correct phone number length ', () => {
      expect(new Validator('+38094').isPhoneNumber()).toBe(false);
    });

    test('isPhoneNumber valid data', () => {
      expect(new Validator('+380945555555').isPhoneNumber()).toBe(true);
    });
  });
});
