/**
 * Created by kersal_e on 27/07/2016.
 */

import TopMenuView from './views/topMenu';
import LeftMenuView from './views/leftMenu';

class Router extends Backbone.Router {

  UrlBase() {
    return  this.UrlBase;
  }

  constructor() {
    super({
      routes: {
        '': 'home'
      }
    });
  }

  static get urlBase() {
    return 'http://beavr-api.herokuapp.com';
  }

  initialize() {
    new TopMenuView({userModel : ($.cookie('beavr-token') !== undefined) ? $.cookie('beavr-token') : 'undefined'});
    new LeftMenuView();
  }

  SelectedObject(id) {

  }

  home() {
    console.log("hello");

  }

}

export default Router;