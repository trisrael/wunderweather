import Ember from 'ember';

const POLL_INTERVAL = 30 * 1000;

export default Ember.Controller.extend({
  _pollingInterval: null,
  startPolling() {
    Ember.run.later(this, 'doPoll', POLL_INTERVAL)
  },

  doPoll() {
    this.send('checkForUpdates');
    Ember.run.later(this, 'doPoll', POLL_INTERVAL)
  }

});
