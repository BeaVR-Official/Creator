/**
 * Created by kersal_e on 27/07/2016.
 */

import TopMenuView from './views/topMenu';

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

  initialize() {
    this.urlBase = 'http://beavr-api.herokuapp.com';
  }

  SelectedObject(id) {

  }

  home() {
    console.log("hello");
    new TopMenuView();
  }

}

export default Router;