import Ember from 'ember';

const POLL_INTERVAL = 5 * 1000;

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  selectedCity: {

  },

  cityQuery: "San Francisco",

  searchCities() {
    return this.get('store').query('city', { name: this.get('cityQuery') });
  },

  _updateNow: Ember.on('init', function() {
    this.set('now', new Date());
    Ember.run.later(this, '_updateNow', 2 * 1000);
  }),

  now: null,
  hours: Ember.computed('now', function() {
    return moment(this.get('now')).format('H');
  }),

  minutes: Ember.computed('now', function() {
    return moment(this.get('now')).format('mm');
  }),

  seconds: Ember.computed('now', function() {
    return moment(this.get('now')).format('ss');
  }),

  ampm: Ember.computed('now', function() {
    return moment(this.get('now')).format('a');
  }),

  morningTempsHashified: Ember.computed('morningTemps.@each', function() {
    return Ember.A(this.get('morningTemps')).mapBy('temp.celcius').join('');
  }),

  nightTempsHashified: Ember.computed('nightTemps.@each', function() {
    return Ember.A(this.get('nightTemps')).mapBy('temp.celcius').join('');
  }),

  _pollingInterval: null,
  startPolling() {
    Ember.run.later(this, 'doPoll', POLL_INTERVAL)
  },

  doPoll() {
    this.send('checkForUpdates');
    //Ember.run.later(this, 'doPoll', POLL_INTERVAL)
  },

  actions: {
    autocompleteCities() {
      Ember.run.debounce(this, this.searchCities, 300);
    }
  }

});
