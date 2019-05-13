const getFirstName = fullName => fullName.split(' ')[0];

const isValidPassword = password =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) &&
  !/password/gi.test(password);

module.exports = { getFirstName, isValidPassword };
