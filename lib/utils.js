'use strict';

const utils = (module.exports = {
    isOptionsHash(o) {
        return (
            o &&
            typeof o === 'object' &&
            (OPTIONS_KEYS.some((prop) => hasOwn(o, prop)) ||
                DEPRECATED_OPTIONS_KEYS.some((prop) => hasOwn(o, prop)))
        );
    },
    /**
     * Outputs a new function with interpolated object property values.
     * Use like so:
     *   const fn = makeURLInterpolator('some/url/{param1}/{param2}');
     *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
     */
    makeURLInterpolator: (() => {
        const rc = {
            '\n': '\\n',
            '"': '\\"',
            '\u2028': '\\u2028',
            '\u2029': '\\u2029',
        };
        return (str) => {
            const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
            return (outputs) => {
                return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) =>
                    encodeURIComponent(outputs[$1] || '')
                );
            };
        };
    })(),
    extractUrlParams: (path) => {
        const params = path.match(/\{\w+\}/g);
        if (!params) {
            return [];
        }

        return params.map((param) => param.replace(/[{}]/g, ''));
    },
    /**
     * Return the data argument from a list of arguments
     *
     * @param {object[]} args
     * @returns {object}
     */
    getDataFromArgs(args) {
        if (!Array.isArray(args) || !args[0] || typeof args[0] !== 'object') {
            return {};
        }

        if (!utils.isOptionsHash(args[0])) {
            return args.shift();
        }

        const argKeys = Object.keys(args[0]);

        return {};
    },
    callbackifyPromiseWithTimeout: (promise, callback) => {
        if (callback) {
            // Ensure callback is called outside of promise stack.
            return promise.then(
                (res) => {
                    setTimeout(() => {
                        callback(null, res);
                    }, 0);
                },
                (err) => {
                    setTimeout(() => {
                        callback(err, null);
                    }, 0);
                }
            );
        }

        return promise;
    },
});