'use strict';

const resources = require('./resources/resources');

function NetworkLeads(key, config = {}) {
    if (!(this instanceof NetworkLeads)) {
        return new NetworkLeads(key, config);
    }

    this.aaa = "bbb";
    this.Resources = resources;
}


module.exports = NetworkLeads;