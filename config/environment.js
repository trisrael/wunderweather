/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'sonder',
    environment,
    rootURL: '/',
    locationType: 'auto',

    moment: {
      // Options:
      // 'all' - all years, all timezones
      // 'subset' - subset of the timezone data to cover 2010-2020 (or 2012-2022 as of 0.5.12). all timezones.
      // 'none' - no data, just timezone API
      includeTimezone: 'all'
    },

    firebase: {
      apiKey: "AIzaSyCyMqoVxreTq3Vc91ZlzTdl-P5Pro9dqeE",
      authDomain: "neurotrig-2a869.firebaseapp.com",
      databaseURL: "https://neurotrig-2a869.firebaseio.com",
      projectId: "neurotrig-2a869",
      storageBucket: "neurotrig-2a869.appspot.com",
      messagingSenderId: "321023762844"
    },

    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com 'unsafe-inline'",
      'frame-src': "'self' https://*.firebaseapp.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com  http://*.wunderground.com",
      'default-src': "'none'",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
      'font-src': "'self' fonts.gstatic.com",
      'img-src': "'self' data:",
      'media-src': "'self'"
    } ,

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
