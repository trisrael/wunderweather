import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('temperature-extremes', 'Integration | Component | temperature extremes', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{temperature-extremes}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#temperature-extremes}}
      template block text
    {{/temperature-extremes}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
