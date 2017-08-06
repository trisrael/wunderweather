import Ember from 'ember';

const POLL_INTERVAL = 30 * 1000;

export default Ember.Controller.extend({
  _updateNow: Ember.on('init', function() {
    this.set('now', new Date());
    Ember.run.later(this, '_updateNow', 20 * 1000);
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

  _pollingInterval: null,
  startPolling() {
    Ember.run.later(this, 'doPoll', POLL_INTERVAL)
  },

  doPoll() {
    this.send('checkForUpdates');
    Ember.run.later(this, 'doPoll', POLL_INTERVAL)
  }

});
