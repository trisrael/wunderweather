import Ember from 'ember';

// Given an array of hours and 'low' or 'high', return the extreme hour
export function findExtremeHour(hours, extremeType) {
  let startHour = hours[0];
  return hours.reduce((extremeHour, nextHour) => {
    if (extremeType === 'low') {
      return nextHour.temp.celcius < extremeHour.temp.celcius ? nextHour : extremeHour;
    } else {
      return nextHour.temp.celcius > extremeHour.temp.celcius ? nextHour : extremeHour;
    }
  }, startHour);

  return params;
}

export default Ember.Helper.helper(function([hours, extremeType]) {
  return findExtremeHour(hours, extremeType);
});
