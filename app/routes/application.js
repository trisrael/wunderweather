import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return $.get("http://api.wunderground.com/api/b8f3d2f816f15ef9/conditions/hourly/hourly10day/q/CA/San_Francisco.json")
  },

  setupController(controller, {current_observation, hourly_forecast}) {
    let observation_location, observation_time;
    ({ observation_location, observation_time } = current_observation);

    let hourlyTemps = hourly_forecast.map((raw) => {
      let flatten = Object.assign({},raw.FCTTIME, raw, {temp: {celcius: parseFloat(raw.temp.metric), fahrenheight: parseFloat(raw.temp.english) }});
      delete flatten.FCTTIME;
      return flatten;
    });

    controller.setProperties({
      temp: {celsius: current_observation.temp_c, fahrenheight: current_observation.temp_f},
      observationLoc: observation_location,
      observationTime: observation_time,
      hourlyTemps: hourlyTemps,
      highestTempHour: hourlyTemps.reduce((highestHour, nextHour) => {
        return nextHour.temp.celcius > highestHour.temp.celcius ? nextHour : highestHour;
      }), hourlyTemps[0]),
      lowestTempHour: hourlyTemps.reduce((lowestHour, nextHour) => {
        return nextHour.temp.celcius < lowestHour.temp.celcius ? nextHour : highestHour;
      }), hourlyTemps[0]),
    })
  }

});

// temp
//
