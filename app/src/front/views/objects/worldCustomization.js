/**
 * Created by vincent on 16/10/16.
 */

import Loader from '../../utils';
import * as Backbone from 'backbone';
import Navigator from '../../../modules/creator/Navigator';

class WorldCustomization extends Backbone.View {

  get template() {
    return _.template(Loader.templates.WorldCustomization);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click #addGround': 'addGround',
      'click #addSky': 'addSky'
    };
  }

  constructor() {
    super();
  }

  initialize() {

  }

  render() {
    this.$el.html(this.template());
    return this;
  }

  addGround() {
    Navigator.addGround();
  }

  addSky() {
    Navigator.addSky();
  }
}

export default WorldCustomization;