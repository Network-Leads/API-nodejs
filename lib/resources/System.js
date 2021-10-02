// File generated from our OpenAPI spec

'use strict';
const NetworkLeadsRequest = require('../createRequest');

module.exports = {
  path: 'system',
  notify: NetworkLeadsRequest({
    method: 'POST',
    path: '/notify',
  }),
};