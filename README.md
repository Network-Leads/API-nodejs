# Network Leads Node.js Library

[![Version](https://img.shields.io/npm/v/stripe.svg)](https://www.npmjs.org/package/stripe)
[![Build Status](https://travis-ci.org/stripe/stripe-node.svg?branch=master)](https://travis-ci.org/stripe/stripe-node)
[![Coverage Status](https://coveralls.io/repos/github/stripe/stripe-node/badge.svg)](https://coveralls.io/github/stripe/stripe-node)
[![Downloads](https://img.shields.io/npm/dm/stripe.svg)](https://www.npmjs.com/package/stripe)

The Network Leads Node library provides convenient access to the Network Leads API from
applications written in server-side JavaScript.

## Documentation

It was hard to write - it should be hard to read. GOOD LUCK.

## Requirements

Node 8, 10 or higher.

## Installation

Install the package with:

```sh
npm install @network-leads/app
```

## Usage

The package Should be used initially only and NOT on public-accessed code

<!-- prettier-ignore -->
```js
const NLAPP = require('@network-leads/app');

NLAPP.users.get({
  id: 1
})
  .then(user => console.log(user.fullName))
  .catch(error => console.error(error));
```

Or using ES modules and `async`/`await`:

```js
import NL from '@network-leads/app';
const NLAPP = new NL();

(async () => {
  const user = await NLAPP.users.get({
    id:1,
  });

  console.log(user.fullName);
})();
```


### Using Promises

Every method returns a chainable promise which can be used instead of a regular
callback:

```js
// Get a new user and then update the user phone:
NLAPP.users
  .get({
    id: 1,
  })
  .then((user) => {
    // have access to the user object
    return NLAPP.users
      .update({
        id: user.id, // set the user id
        phone: "818-1234567", // new phone
      })
      .then((userUpdate) => {
        if(userUpdate){return true}else{return false}
      })
      .catch((err) => {
        // Deal with an error
      });
  });
```


| Option              | Default            | Description                                                                                                                                                                                                                                       |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `versiom`        | `null`             | NL API version to be used. If not set the account's default version will be used.                                                                                                                                                             |
| `OPTION1` | 0                  | The amount of times a request should be [retried](#network-retries).                                                                                                                                                                              |

