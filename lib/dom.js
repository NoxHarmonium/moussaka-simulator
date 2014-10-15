(function (document, window) {
  'use strict';

  var $ = require('jquery.js');
  var simulator = require('simulator.js');
  var utils = require('utils.js');
  var errorHelp = require('errorHelp.js');

  var errorHeadingEl;
  var errorEl;
  var errorHelpEl;

  //
  //  Simulator Events
  //

  simulator.client.on('error', function (err) {
    errorHeadingEl.parent()
      .removeClass('hidden');

    errorEl.text(err.message);

    for (var msg in errorHelp) {
      if (err.message.indexOf(msg) !== -1) {
        errorHelpEl.text(errorHelp[msg]);
        errorHelpEl.parent()
          .removeClass('hidden');
        break;
      }
    }

  });

  //
  // Actions
  //

  var loadFormFromQueryVars = function () {
    var urlVars = utils.getUrlVars();
    simulator.client.deviceName = $('#txtDeviceName')
      .val(urlVars.deviceName || 'Test Device');
    simulator.client.apiKey = $('#txtApiKey')
      .val(urlVars.apiKey || '');
    simulator.client.projectId = $('#txtProjectId')
      .val(urlVars.projectId || '');
    simulator.client.projectVersion = $('#txtProjectVersion')
      .val(urlVars.projectVersion || '');

    simulator.client.serverUrl = $('#txtServerUrl')
      .val(urlVars.serverUrl || 'http://localhost:3000/');
    simulator.client.pollInterval = $('#txtPollInterval')
      .val(urlVars.pollInterval || 1000);


  };

  var tryConnect = function () {
    simulator.client.deviceName =
      $('#txtDeviceName')
      .val();
    simulator.client.apiKey =
      $('#txtApiKey')
      .val();
    simulator.client.projectId =
      $('#txtProjectId')
      .val();
    simulator.client.projectVersion =
      $('#txtProjectVersion')
      .val();

    simulator.client.serverUrl =
      $('#txtServerUrl')
      .val();
    simulator.client.pollInterval =
      $('#txtPollInterval')
      .val();

    errorHelpEl.parent()
      .addClass('hidden');
    errorHeadingEl.parent()
      .addClass('hidden');
    simulator.client.connect();
  };

  var onLoad = function ($) {
    errorHeadingEl = $('div#errorbox > h5');
    errorEl = $('div#errorbox > p');
    errorHelpEl = $('div#errorhelp > p');

    $('div.container')
      .find('.accordion-toggle')
      .click(function () {
        $(this)
          .toggleClass('toggled');
        //Expand or collapse this panel
        $(this)
          .nextUntil('.accordion-content')
          .next()
          .slideToggle('fast');
      });

    $('.connect-button')
      .click(function () {
        console.log('Connecting...');
        tryConnect();
      });
  };

  //
  // DOM Events
  //

  // Thanks http://uniondesign.ca/simple-accordion-without-jquery-ui/
  $(document)
    .ready(onLoad);

  module.exports = {};

})(document, window);
