import Ember from 'ember';

export default Ember.Component.extend({
  temperatureHours: null,

  hourLabels: Ember.computed(function(temperatureHours) {
    return [...new Set(this.get('temperatureHours').map(({ hour }) => hour))];
  })

});
