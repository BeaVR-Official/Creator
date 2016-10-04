/**
 * Created by giraud_d on 04/10/2016.
 */

/**
 * Created by giraud_d on 04/10/2016.
 */

import Loader from '../../utils';
import * as Backbone from 'backbone';

class ScenePanelView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ScenePanel);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {

    };
  }

  constructor() {
    super();
  }

  initialize() {

  }

  render() {
    this.$el.html(this.template);
    return this;
  }
}

export default ScenePanelView;