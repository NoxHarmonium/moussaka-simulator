(function (module) {
  'use strict';

  module.exports = {
    'Origin is not allowed by Access-Control-Allow-Origin': '' +
      'You cannot use the API by opening the HTML file locally. ' +
      'You need to serve it from somewhere. ' +
      'If you have grunt installed you run "grunt serve" from ' +
      'the project root.'
  };

})(module);
