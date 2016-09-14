/**
 * Created by giraud_d on 14/09/2016.
 */

import Loader from '../../utils';
import * as Backbone from 'backbone';

class SceneDropdownView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.SceneDropdown);
  }

  get $el() {
    return $('.scene-dropdown');
  }
  
  set $el(el) {
    this.$el = el;
  }

  get events() {
    return {
      'click #dropdown-button' : $('#dropdown-button').dropdown()
    };
  }

  constructor() {
    super();
  }

  initialize() {
    this.render();
  }
  
  render() {
    this.$el.html(this.template);
    return this;
  }
}

export default SceneDropdownView;