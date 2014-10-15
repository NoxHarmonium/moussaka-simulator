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
  // Actions
  //

  var showError = function (err) {
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
  };

  var loadFormFromQueryVars = function () {
    // Get params from query vars so it can be
    // launched in a popup

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

    if (urlVars.connectNow) {
      tryConnect();
    }

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

    try {
      simulator.client.connect();
    } catch (ex) {
      showError(ex);
    }
    // Hide controls on success
    $('control-container')
      .slideUp('fast');

  };

  var tryDisconnect = function () {
    try {
      simulator.client.disconnect();
    } catch (ex) {
      showError(ex);
    }
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

    $('.disconnect-button')
      .click(function () {
        console.log('Disconnecting...');
        tryDisconnect();
      });

    loadFormFromQueryVars();
  };

  //
  // DOM Events
  //

  // Thanks http://uniondesign.ca/simple-accordion-without-jquery-ui/
  $(document)
    .ready(onLoad);

  //
  //  Simulator Events
  //

  simulator.client.on('error', showError);

  // Nothing to export
  module.exports = {};

})(document, window);
