'use strict';
require("dotenv").config()
const axios = require('axios');
const utils = require('./utils');

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'charges' or 'customers')
 * @param [spec.urlParams=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceding the also-optional callback argument
 * @param [spec.encode] Function for mutating input parameters to a method.
 *  Usefully for applying transforms to data on a per-method basis.
 * @param [spec.host] Hostname for the request.
 */

function createRequest(spec) {

    return function(...args) {

        const callback = typeof args[args.length - 1] == 'function' && args.pop();

        const requestPromise = utils.callbackifyPromiseWithTimeout(
            makeRequest(this, args, spec, {}),
            callback
        );

        return requestPromise;
    };
}

function getRequestOpts(self, requestArgs, spec, overrideData) {

    // Extract spec values with defaults.
    const requestMethod = (spec.method || 'GET').toUpperCase();

    const requestPath = process.env.DEFAULT_HOST+process.env.DEFAULT_BASE_PATH+self.path+spec.path;
    const bodyData = requestArgs;
    const headers = "";

    return {
        requestMethod,
        requestPath,
        bodyData,
        headers,
    };
}

function makeRequest(self, requestArgs, spec, overrideData) {

    return new Promise((resolve, reject) => {
        let opts;
        try {
            opts = getRequestOpts(self, requestArgs, spec, overrideData);
        } catch (err) {
            reject(err);
            return;
        }

        axios({
            method: opts.requestMethod,
            url: opts.requestPath,
            data: opts.bodyData[0]
        }).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
                reject(error);
        });


        console.log(opts);

        return;
        // Make the request here based on the opts
        axios.post(opts.requestPath, opts.bodyData[0])
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });

    });
}

module.exports = createRequest;
