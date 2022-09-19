/**
 * Handlebars Helpers
 * http://github.com/assemble/handlebars-helpers
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

'use strict';

// Node.js
var path = require('path');
var fs = require('fs');

// node_modules
var matchkeys = require('matchkeys');
var matchdep = require('matchdep');
var _ = require('lodash');

// Local utils.
var Utils = require('./utils/utils');

/**
 * This function will registers all the helpers to handlebars.
 *
 * @param Handlebars The handlebars object that we want to modify
 * @param options options for where the default helpers are defined
 * @param params extra params
 * @param helpers if user pass in this, we use this as the additional helpers that we want to register
 */
module.exports.register = function (Handlebars, options, params, helpers) {

  // Local package.json
  var pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));

  var hbsHelpers = helpers || {};
  module.exports.registerToHelpers(hbsHelpers, options, params);

  for (var helper in hbsHelpers) {
    if (hbsHelpers.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, hbsHelpers[helper]);
    }
  }

  function registerHelper(file) {
    var helper = require(file);
    if (!(typeof helper === 'undefined' || typeof helper.register === 'undefined'))
      return helper.register(Handlebars, options, params);
  }

  /**
   * Register helpers from node_modules
   * Attempt to find, resolve and register any helpers that are both
   * listed in the keywords and either dependencies or devDependencies
   * of package.json.
   */
  if (pkg.keywords && pkg.keywords.length > 0) {

    // Get keywords from package.json and search for matches in dependencies
    matchkeys.filter('*').map(function (keywords) {
      matchdep.filterAll(keywords, pkg).forEach(function (match) {
        registerHelper(match);
      });
    });
  }
};

/**
 * get all the helpers defined in certain files (there's a default place where we can load them)
 *
 * @param hbsHelpers
 * @param options
 * @param params
 * @returns {*|{}}
 */
module.exports.registerToHelpers = function (hbsHelpers, options, params) {

  hbsHelpers = hbsHelpers || {};

  var helpers = path.join.bind(null, __dirname, 'helpers');

  function registerHelper(file) {
    var helper = require(file);
    if (!(typeof helper === 'undefined' || typeof helper.register === 'undefined'))

      try {
        return helper.register(hbsHelpers, options, params);
      } catch (err) {
        console.error("ERROR: registering helper:" + err);
      }
  }

  /**
   * Register local helpers
   */
  var localHelpers = fs.readdirSync(helpers());

// Load local helpers.
  localHelpers.map(function (helper) {
    registerHelper(helpers(helper));
  });

  return hbsHelpers;
}
;
