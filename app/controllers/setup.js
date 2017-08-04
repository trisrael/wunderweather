import Ember from 'ember';

export default Ember.Controller.extend({
  currentBooking: null,
  store: Ember.inject.service(),
  isValidRange: Ember.computed('start', 'end', function() {
    return this.get('end') > this.get('start');
  }),

  hasValidBooking: Ember.computed.and('selectedLocation', 'isValidRange'),

  actions: {

  }

});
