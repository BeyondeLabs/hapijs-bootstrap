const Lab = require('lab');
const lab = exports.lab = Lab.script();

const {
  experiment,
  test,
  expect,
} = lab;

const {
  server,
} = require('./deps');

experiment('Base API response:', () => {
  test('GET /', (done) => {
    const options = {
      method: 'GET',
      url: '/',
    };

    server.inject(options, (res) => {
      expect(res.result.message).to.equal('hello, world');
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
