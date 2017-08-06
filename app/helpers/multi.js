import Ember from 'ember';

export function multi([a,b]/*, hash*/) {
  return a * b;
}

export default Ember.Helper.helper(multi);
