/**
 * Created by kersal_e on 27/07/2016.
 */

import Router from './router';
import Loader from './utils';

class Application {
  constructor() {
    Loader.loadTemplates([
      'TopMenu',
      'LeftMenuCategories',
      'ObjectMenu',
      'PropertiesPanel',
      'ProjectPanel',
      'ScenePanel',
      'ProjectHandler',
      'ScriptsMenu',
      'ActionBlock',
      'ActionBlockParams',
      'ProjectHandler',
      'CustomObject',
      'WorldCustomization'], function() {
      new Router();
      Backbone.history.start();
    });
  }
}

$(() => {
  new Application();
});