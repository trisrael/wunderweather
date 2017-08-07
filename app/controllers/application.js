import Ember from 'ember';

const POLL_INTERVAL = 3 * 60 * 1000;

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  updateNowTime() {
    this.set('now', moment().tz(this.get('observationTzLong')));
    Ember.run.later(this, 'updateNowTime', 2 * 1000);
  },

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

  startPolling() {
    Ember.run.later(this, 'doPoll', POLL_INTERVAL)
  },

  doPoll() {
    this.send('checkForUpdates', this.get('selectedCity'));
    Ember.run.later(this, 'doPoll', POLL_INTERVAL)
  },

  actions: {
    changeCity(city) {
      this.send('checkForUpdates', city);
    }
  }

});
