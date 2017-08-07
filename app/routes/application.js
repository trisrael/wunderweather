import Ember from 'ember';
const { get } = Ember;

export default Ember.Route.extend({

  model() {

    // seems thats "hourly_forecast" gets overwritten when using both hourly and hourly10
    return fetchDataForCity();
  },

  setupController(controller, data) {
    controller.setProperties(buildControllerProperties(data));
    controller.startPolling();
  },

  actions: {
    checkForUpdates() {
      // Switch to New York
      fetchDataForCity('10001.1.99999').then((data) => {
        let {conditionsAndHourly, hourl10} = data;
        let observation_time, temp_c, temp_f;
        ({ observation_time, temp_c, temp_f } = conditionsAndHourly.current_observation);

        // check if any updates fetched
        if (observation_time !== this.controller.get('observationTime')) {
          this.controller.setProperties(buildControllerProperties(data));
        }
      });
    }
  }

});

function fetchDataForCity(city_id = "94102.1.99999") {
  let randNumber = getRandomNumber();
  // In order to get non browser cached data from the server
  return Ember.RSVP.hash({
    conditionsAndHourly: $.get(`http://api.wunderground.com/api/274241323251e02d/conditions/hourly/q/${city_id}.json?NO304=${randNumber}`),
    hourly10: $.get(`http://api.wunderground.com/api/274241323251e02d/hourly10day/q/${city_id}.json?NO304=${randNumber}`),
  });
}

function buildControllerProperties({conditionsAndHourly, hourly10}) {
  let observation_location, observation_time;
  ({ observation_location, observation_time } = conditionsAndHourly.current_observation);

  let seenHours = []; // cache for checking for already counted hour
  let hourlyTemps = conditionsAndHourly.hourly_forecast
    .map(formatHourData)
    .sort(simpleNumericComparatoryBy.bind(null, 'hour'))
    .filter(({civil}) => { //ensure only single 10am // not choosing particularly
      if (seenHours.indexOf(civil) !== -1) { return false };
      seenHours.push(civil);
      return true;
    });

  // not gonna really be the weekly low/high as this is 10 day
  // NOTE: filter down to around current day (7 days of weekday plus weekend)
  let hourly10Temps = hourly10.hourly_forecast
    .map(formatHourData)
    .sort(simpleNumericComparatoryBy.bind(null, 'epoch'));

  let properties = {
      temp: {
        celsius: conditionsAndHourly.current_observation.temp_c,
        fahrenheight: conditionsAndHourly.current_observation.temp_f
      },
      observationLoc: observation_location,
      observationTime: observation_time,
      hourlyTemps,
      morningTemps: hourlyTemps.filter(({hour}) => hour < 12),
      nightTemps: hourlyTemps.filter(({hour}) => hour >= 12),
      hourly10Temps
    };
  return properties;
}

// Given a wunderground hour data, move FCTTIME up
// Format temperature format in more consistent fashion
function formatHourData(rawHour) {
  let flatten = Object.assign(
    {},
    rawHour.FCTTIME,
    rawHour,
    {temp: {celcius: parseFloat(rawHour.temp.metric), fahrenheight: parseFloat(rawHour.temp.english) }}
  );
  delete flatten.FCTTIME;
  return flatten;
}

// Comparator that takes a `path` for a given object and sorts by ascending
// based on relative float values.
//
// Be sure to pass a `path` that contains a float or an int, or a string containing those.
function simpleNumericComparatoryBy(path, a, b) {
  return parseFloat(get(a, path)) > parseFloat(get(b, path)) ? 1 : -1;
}

function getRandomNumber() {
  var array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0];
}
