/**
 * Created by kersal_e on 27/07/2016.
 */

import LeftMenuView from './views/leftMenu';
import TopMenuView from './views/topMenu';
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
    this.topMenu = new TopMenuView({userModel : new User()});
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
            headers: { 'Authorization': "Bearer " + res.data.token }
          });
          var user = new User({id: res.data.userId});
          user.fetch({
            success: function() {
              this.topMenu.changeUser(user);
              $("#connexionModal").modal('hide');
              $(".basic.modal").modal({
                observeChanges: true,
                onVisible: function () {
                $(".basic.modal").modal("refresh");
              }}).modal("show");

            }
          });
        },
        error: function(err) {
          alert(err);
        }
      });
    });
  }

  home() {
    console.log("Backckbone routes init");
  }

}

export default Router;