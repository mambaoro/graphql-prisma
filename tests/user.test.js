const { getFirstName, isValidPassword } = require('../server/gql/lib/user');

describe('Get first name', () => {
  it('should render the firstname', () => {
    const firstName = getFirstName('Mamadou Baoro');
    expect(firstName).toBe('Mamadou');
  });
  it('should return firstname when given firstname', () => {
    const firstName = getFirstName('Mamadou');
    expect(firstName).toBe('Mamadou');
  });
});

describe('Password validation', () => {
  it('should return true when the password is valid', () => {
    const isValid = isValidPassword('h147cc97');
    expect(isValid).toBe(true);
  });
});
