# enpies-node

[![Build Status](https://travis-ci.org/enpies/enpies-node.svg?branch=master)](https://travis-ci.org/enpies/enpies-node)
[![NPM version](https://img.shields.io/npm/v/enpies.svg)](https://www.npmjs.com/package/enpies)

You can sign up for an Enpies account at [https://enpies.com](https://enpies.com)

# Installation

`npm install enpies`

# Usage

### Initialization

```js
var Enpies = require('enpies');

var enpies = new Enpies({
    publicKey: 'PUBLICKEY',
    secretKey: 'SECRETKEY',
    uri: 'https://enpies.com'
});
```