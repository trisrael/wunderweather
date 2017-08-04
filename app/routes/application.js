import Ember from 'ember';

export default Ember.Route.extend({

  model() {

    // seems thats hourly_forecast... are concated... split to deal
    return Ember.RSVP.hash({
      conditions: $.get("http://api.wunderground.com/api/b8f3d2f816f15ef9/conditions/hourly/hourly10day/q/CA/San_Francisco.json"),
      hourly: $.get("http://api.wunderground.com/api/b8f3d2f816f15ef9/hourly/q/CA/San_Francisco.json"),
      hourly10: $.get("http://api.wunderground.com/api/b8f3d2f816f15ef9/hourly10day/q/CA/San_Francisco.json"),
    });
  },

  setupController(controller, {conditions, hourly, hourly10}) {
    let observation_location, observation_time;
    ({ observation_location, observation_time } = conditions.current_observation);



    let hourlyTemps = hourly.hourly_forecast.map((raw) => {
      let flatten = Object.assign({},raw.FCTTIME, raw, {temp: {celcius: parseFloat(raw.temp.metric), fahrenheight: parseFloat(raw.temp.english) }});
      delete flatten.FCTTIME;
      return flatten;
    }).sort((a,b)=> { return parseInt(a.hour) > parseInt(b.hour) ? 1 : - 1 });

    // not gonna really be the weekly low/high as this is 10 day
    // NOTE: filter down to around current day (7 days of weekday plus weekend)
    let hourly10Temps = hourly10.hourly_forecast.map((raw) => {
      let flatten = Object.assign({},raw.FCTTIME, raw, {temp: {celcius: parseFloat(raw.temp.metric), fahrenheight: parseFloat(raw.temp.english) }});
      delete flatten.FCTTIME;
      return flatten;
    }).sort((a,b)=> { return parseInt(a.epoch) > parseInt(b.epoch) ? 1 : - 1 });

    let lowest10dayTempHour = hourly10Temps.reduce((lowestHour, nextHour) => {
      return nextHour.temp.celcius < lowestHour.temp.celcius ? nextHour : lowestHour;
    }, hourly10Temps[0]);

    let highest10dayTempHour = hourly10Temps.reduce((highestHour, nextHour) => {
      return nextHour.temp.celcius > highestHour.temp.celcius ? nextHour : highestHour;
    }, hourly10Temps[0]);

    controller.setProperties({
      temp: {celsius: conditions.current_observation.temp_c, fahrenheight: conditions.current_observation.temp_f},
      observationLoc: observation_location,
      observationTime: observation_time,
      hourlyTemps: hourlyTemps,
      highestTempHour: hourlyTemps.reduce((highestHour, nextHour) => {
        return nextHour.temp.celcius > highestHour.temp.celcius ? nextHour : highestHour;
      }, hourlyTemps[0]),
      lowestTempHour: hourlyTemps.reduce((lowestHour, nextHour) => {
        return nextHour.temp.celcius < lowestHour.temp.celcius ? nextHour : lowestHour;
      }, hourlyTemps[0]),
      highest10dayTempHour,
      lowest10dayTempHour,
      hourlyBreakdown:[ {x:0, y: 2}, {x:1, y: 3}]
    });
  }

});

// temp
//
