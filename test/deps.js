/**
 * Dependencies
 */
const _ = require('lodash');

const server = require(`${__dirname}/../server`);

function beforeStub(done, headers) {

  // get the authentication token

  const options = {
    method: 'POST',
    url: '/auth',
    payload: {
      email: 'joe@example.com',
      password: '12345',
    },
  };
  server.inject(options, (res) => {
    headers.Authorization = `Bearer ${res.result.token}`;
    done();
  });
}

module.exports = {
  _,
  server,
  beforeStub,
};
