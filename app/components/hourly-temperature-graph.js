import Ember from 'ember';
import { findExtremeHour } from '../helpers/find-extreme-hour'

export default Ember.Component.extend({
  classNames: ["HourlyGraph"],
  temperatureHours: null,

  height: 250,

  hourLabels: Ember.computed(function(temperatureHours) {
    return [...new Set(this.get('temperatureHours').map(({ hour }) => hour))];
  }),

  timeLabels: Ember.computed(function(temperatureHours) {

  }),

  highTemperature: Ember.computed('temperatureHours.@each', function() {
    let observationHour =  findExtremeHour(this.get('temperatureHours'), 'high')
    return observationHour.temp.fahrenheight;
  }),

  lowTemperature: Ember.computed('temperatureHours.@each', function() {
    let observationHour =  findExtremeHour(this.get('temperatureHours'), 'low')
    return observationHour.temp.fahrenheight;
  }),

  differenceTemperature: Ember.computed('lowTemperature', 'highTemperature', function() {
    return Math.abs(this.get('highTemperature') - this.get('lowTemperature'));
  }),

  dataHeight: Ember.computed('height', function() {
    return this.get('height') * (2/3);
  }),

  tempHoursWithYs: Ember.computed('dataHeight', 'differenceTemperature', 'temperatureHours.@each', 'lowTemperature', function() {
    let { dataHeight, differenceTemperature, lowTemperature, temperatureHours } = this.getProperties('dataHeight', 'differenceTemperature', 'temperatureHours', 'lowTemperature');
    return temperatureHours.map((tempHour) => {
      let multiplier = dataHeight / differenceTemperature;
      let rangePosition = ( tempHour.temp.fahrenheight - lowTemperature ) % differenceTemperature;
      return Object.assign({}, tempHour, { yCoord: multiplier * rangePosition });
    });
  })

});
