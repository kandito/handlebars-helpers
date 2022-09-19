/**
 * Handlebars Helpers: Path Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Node.js
var path = require('path');
var _ = require('lodash');


// Local utils.
var Utils = require('../utils/utils');


// The module to be exported
var helpers = {

  /**
   * {{relative}}
   * Returns the derived relative path from A to B.
   * @param  {[type]} a [description]
   * @param  {[type]} b [description]
   * @return {[type]}   [description]
   * @example:
   *   {{relative [from] [to]}}
   */
  relative: function (a, b) {
    return Utils.getRelativePath(a, b);
  },

  /**
   * {{extname}}
   * Returns the extension of a given file
   * @param  {[type]} ext [description]
   * @return {[type]}     [description]
   * @example:
   *   {{extname "docs/toc.md"}}
   * @returns:
   *   .md
   */
  extname: function (ext) {
    return Utils.getExt(ext);
  }

};
// Export helpers
module.exports.register = function (hbsHelpers, options) {
  options = options || {};
  _.extend(hbsHelpers, helpers);
};
