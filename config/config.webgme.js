// DO NOT EDIT THIS FILE
// This file is automatically generated from the webgme-setup-tool.
'use strict';


var config = require('webgme/config/config.default'),
    validateConfig = require('webgme/config/validator');


// The paths can be loaded from the webgme-setup.json


// Visualizer descriptors

// Add requirejs paths



config.mongo.uri = 'mongodb://127.0.0.1:27017/multi';
validateConfig(config);
module.exports = config;
