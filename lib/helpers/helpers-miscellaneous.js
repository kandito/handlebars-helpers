/**
 * Handlebars Helpers: Misc. Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';

var _ = require('lodash');

// The module to be exported
var helpers = {

  default: function (value, defaultValue) {
    return value != null ? value : defaultValue;
  },

  /**
   * http://handlebarsjs.com/block_helpers.html
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  noop: function (options) {
    return options.fn(this);
  },

  /**
   * {{#withHash}}
   * Build context from the attributes hash
   * @author Vladimir Kuznetsov <https://github.com/mistakster>
   */
  withHash: function (options) {
    return options.fn(options.hash || {});
  }

};
// Export helpers
module.exports.register = function (hbsHelpers, options) {
  options = options || {};
  _.extend(hbsHelpers, helpers);
};
