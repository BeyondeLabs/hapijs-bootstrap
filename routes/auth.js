const Boom = require('boom');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const md5 = require('md5');
const pick = require('lodash/pick');

const Knex = require('../db');

function auth(req, reply) {
  const { email, password } = req.payload;
  const getOperation = Knex('user').where({
    email
  }).select('*').then(([user]) => {
    if (!user) {
      return reply(Boom.notFound('user not found'));
    }

    if (user.password == md5(md5(password))) {
      const token = jwt.sign(
        pick(user, 'first_name', 'last_name', 'email', 'username', 'id'),
        process.env.JWT_KEY,
        {
          algorithm: 'HS256',
          expiresIn: '150d',
        }
      );

      reply({ token, uid: user.uid });
    } else {
      reply(Boom.badRequest('incorrect password'));
    }
  }).catch(err => reply(Boom.badImplementation(err.message)));
};

module.exports = {
  method: 'POST',
  path: '/auth',
  handler: auth,
  config: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
  },
};
