/**
 * Created by kersal_e on 27/07/2016.
 */

import LeftMenuView from './views/leftMenu';
import TopMenuView from './views/topMenu';
import User from './models/userModel';
import * as Backbone from 'backbone';
import ProjectHandler from './views/projectHandler';

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
    let user = new User({id: $.cookie("userID")});
    let TopMenu;
    if ($.cookie("token") && $.cookie("userID")) {
      Backbone.$.ajaxSetup({
        headers: {'Authorization': "Bearer " + $.cookie("token")}
      });
      TopMenu = new TopMenuView({userModel : user, projectHandler: new ProjectHandler()});
      user.fetch({
        success: function() {
          TopMenu.changeUser(user);
        }
      });
    }
    else
      TopMenu = new TopMenuView({userModel : new User(), projectHandler: new ProjectHandler()});
    this.leftMenu = new LeftMenuView();
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
            headers: {'Authorization': "Bearer " + res.data.token}
          });
          var user = new User({id: res.data.userId});
          $.cookie("userID", res.data.userId);
          $.cookie("token", res.data.token);
          user.fetch({
            success: function() {
              this.topMenu.changeUser(user);
              $("#connexionModal").modal('hide');
            }
          });
        },
        error: function(err) {
          alert("Server unreachable please try again!!");
        }
      });
    });
  }

  home() {
    console.log("Backckbone routes init");
  }

}

export default Router;