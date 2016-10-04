/**
 * Created by kersal_e on 27/07/2016.
 */

import Router from './router';
import Loader from './utils';

class Application {
  constructor() {
    Loader.loadTemplates(['TopMenu', 'LeftMenuCategories', 'ObjectMenu', 'PropertiesPanel', 'SceneDropdown', 'ProjectPanel', 'ScenePanel'], function() {
      new Router();
      Backbone.history.start();
    });
  }
}

$(() => {
  new Application();
});