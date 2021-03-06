  (function (module, window) {
    'use strict';

    //
    // Helper Functions
    //

    // From http://www.drupalden.co.uk/get-values-from-url-query-string-jquery
    // Read a page's GET URL variables and return them as an associative array.
    module.exports.getUrlVars = function () {
      var vars = [],
        hash;
      var hashes = window.location.href.slice(
          window.location.href.indexOf('?') + 1)
        .split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    };

  })(module, window);
