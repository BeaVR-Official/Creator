/**
 * Created by kersal_e on 27/07/2016.
 */

import TopMenuView from './views/topMenu';
import LeftMenuView from './views/leftMenu';
import User from './models/userModel';
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
    new TopMenuView({userModel : ($.cookie('beavr-token') !== undefined) ? $.cookie('beavr-token') : undefined});
    new LeftMenuView();
    $(".connexionAction").click(function(){
      var user = $("#connexionEmail").val();
      var password = $("#connexionPassword").val();
      var checkbox = $("#connexionCheckbox").val();
      $.ajax({
        type: "POST",
        url: "http://beavr.fr:3000/api/connection",
        dataType: 'json',
        data: {
          email: user,
          password: password
        },
        success: function(res) {
          Backbone.$.ajaxSetup({
            headers: { 'Authorization': "Bearer " + res.data.token }
          });
          new TopMenuView({userModel : new User({id: res.data.userId})});
          console.log("connecté");
        },
        error: function(err) {
          console.log(err);
        }
      });
    });
  }

  home() {
    console.log("Backckbone routes init");
  }

}

export default Router;