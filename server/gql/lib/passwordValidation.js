const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = async password => {
  if (!password) throw new Error('Password is missing');
  if (typeof password !== 'string') throw new Error('Input is not a string');
  const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    password,
  );
  if (!isValidPassword) throw new Error('Password format is not valid');
  return bcrypt.hash(password, saltRounds);
};
