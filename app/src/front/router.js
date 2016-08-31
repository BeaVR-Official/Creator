/**
 * Created by kersal_e on 27/07/2016.
 */

import TopMenuView from './views/topMenu';
import LeftMenuView from './views/leftMenu';
import TreeViewView from './views/treeView';
import * as Backbone from 'backbone';

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
    return 'http://beavr.fr:3000/api';
  }

  initialize() {
    new TopMenuView({userModel : ($.cookie('beavr-token') !== undefined) ? $.cookie('beavr-token') : 'undefined'});
    new LeftMenuView();
    new TreeViewView();
  }

  SelectedObject(id) {

  }

  home() {
    console.log("Backckbone routes init");

  }

}

export default Router;