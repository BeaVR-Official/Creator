/**
 * Created by kersal_e on 27/07/2016.
 */

import Loader from '../utils';

class TopMenu extends Backbone.View {

  get template() {
    return _.template(Loader.templates.TopMenu);
  }

  get $el() {
    return $('.nav-container');
  }

  constructor(params) {
    super({
      events: {
      }
    });
    this.currentUser = (params != undefined && params["model"]) ? params["model"] : undefined;
    this.render();
  }

  initialize() {

  }

  render() {
    this.$el.html(this.template(this.currentUser));
    return this;
  }
}

export default TopMenu;