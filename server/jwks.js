const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://graphql-prisma.eu.auth0.com/.well-known/jwks.json',
});

module.exports = {
  getKey: (header, cb) => {
    client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey;
      cb(null, signingKey);
    });
  },
  options: {
    audience: '5CyEMcVzI0XeYgmEOcO85vRSQ1nAzc2D',
    issuer: 'https://graphql-prisma.eu.auth0.com/',
    algorithms: ['RS256'],
  },
};
