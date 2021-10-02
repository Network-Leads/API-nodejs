// File generated from our OpenAPI spec

'use strict';
const NetworkLeadsRequest = require('../createRequest');

module.exports = {
  path: 'users',
  getData: NetworkLeadsRequest({
    method: 'GET',
    path: '/{user}/{id}',
  }),
  updateData: NetworkLeadsRequest({
    method: 'POST',
    path: '/{user}/{id}',
  }),
  delete: NetworkLeadsRequest({
    method: 'DELETE',
    path: '/{user}/sources/{id}',
  }),
};