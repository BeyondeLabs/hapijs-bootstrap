const sampleService = require('../services/sample');

module.exports = [
  {
    method: 'GET',
    path: '/sample',
    handler: async (req, reply) => {
      const samples = await sampleService.getSamples(req.query);
      return reply(samples);
    }
  },
];
