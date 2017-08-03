import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.store.createRecord('test', {name: Math.random(), random: {1:2, 2:3}}).save();
    return this.store.findAll('test');
  }
});
