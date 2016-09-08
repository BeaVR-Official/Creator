/**
 * Created by kersal_e on 27/07/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import Save from '../../modules/creator/Save';

class TopMenu extends Backbone.View {

  get template() {
    return _.template(Loader.templates.TopMenu);
  }

  get $el() {
    return $('.nav-container');
  }

  get events() {
    return {
      'click #launch': 'launchApp'
    };
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

  launchApp() {
    Save.saveCustomObjects(true);
    // En dur pour le moment
    document.location.href = "http://localhost:63342/Creator/app/runner.html";
  }

  render() {
    this.$el.html(this.template(this.currentUser));
    return this;
  }
}

export default TopMenu;