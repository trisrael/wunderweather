import DS from 'ember-data';

export default DS.Model.extend({
  ts: DS.attr('date'),
  reason: DS.attr('string'),
  to: DS.belongsTo('booking', { async: false, inverse: null }),
  from: DS.belongsTo('booking', { async: false, inverse: null })
});
