import Ember from 'ember';

export default Ember.Component.extend({
  temperatureHours: null,
  highestTempHour: Ember.computed('temperatureHours.@each', function() {
    let hours = this.get('temperatureHours');
    return hours.reduce((lowestHour, nextHour) => {
      return nextHour.temp.celcius < lowestHour.temp.celcius ? nextHour : lowestHour;
    }, hours[0]);
  }),

  lowestTempHour: Ember.computed('temperatureHours.@each', function() {
    let hours = this.get('temperatureHours');
    return hours.reduce((lowestHour, nextHour) => {
      return nextHour.temp.celcius > lowestHour.temp.celcius ? nextHour : lowestHour;
    }, hours[0]);
  })

});
