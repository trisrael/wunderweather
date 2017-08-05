import Ember from 'ember';
const { get } = Ember;

export default Ember.Route.extend({

  model() {

    // seems thats "hourly_forecast" gets overwritten when using both hourly and hourly10
    return Ember.RSVP.hash({
      conditions: $.get("http://api.wunderground.com/api/b8f3d2f816f15ef9/conditions/hourly/hourly10day/q/CA/San_Francisco.json"),
      hourly: $.get("http://api.wunderground.com/api/b8f3d2f816f15ef9/hourly/q/CA/San_Francisco.json"),
      hourly10: $.get("http://api.wunderground.com/api/b8f3d2f816f15ef9/hourly10day/q/CA/San_Francisco.json"),
    });
  },

  setupController(controller, {conditions, hourly, hourly10}) {
    let observation_location, observation_time;
    ({ observation_location, observation_time } = conditions.current_observation);

    let hourlyTemps = hourly.hourly_forecast
      .map(formatHourData)
      .sort(simpleNumericComparatoryBy.bind(null, 'hour'));

    // not gonna really be the weekly low/high as this is 10 day
    // NOTE: filter down to around current day (7 days of weekday plus weekend)
    let hourly10Temps = hourly10.hourly_forecast
      .map(formatHourData)
      .sort(simpleNumericComparatoryBy.bind(null, 'epoch'));

    controller.setProperties({
      temp: {
        celsius: conditions.current_observation.temp_c,
        fahrenheight: conditions.current_observation.temp_f
      },
      observationLoc: observation_location,
      observationTime: observation_time,
      hourlyTemps,
      hourly10Temps
    });
  }

});

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
