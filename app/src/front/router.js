/**
 * Created by kersal_e on 27/07/2016.
 */

import LeftMenuView from './views/leftMenu';
import TopMenuView from './views/topMenu';
import ProjectHandler from './views/projectHandler';
import User from './models/userModel';
import * as Backbone from 'backbone';

import GraphicalManager from '../modules/common/GraphicalManager';
import Constants from '../modules/creator/Constants';

class Router extends Backbone.Router {

  UrlBase() {
    return this.UrlBase;
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
    let topMenu;
    if ($.cookie("token") && $.cookie("userID")) {
      Backbone.$.ajaxSetup({
        headers: {'Authorization': "Bearer " + $.cookie("token")}
      });
      topMenu = new TopMenuView({userModel: user, projectHandler: new ProjectHandler()});
      user.fetch({
        success: function () {
          topMenu.changeUser(user);
        }
      });
    }
    else
      topMenu = new TopMenuView({userModel: new User(), projectHandler: new ProjectHandler()});
    this.leftMenu = new LeftMenuView();

    this.mouseEvent();

    $(".connexionAction").click(function () {
      var user     = $("#connexionEmail").val();
      var password = $("#connexionPassword").val();
      var checkbox = $("#connexionCheckbox").val();
      $.ajax({
        type:     "POST",
        url:      "http://beavr.fr:3000/api/connection",
        dataType: 'json',
        data:     {
          email:    user,
          password: password
        },
        success:  function (res) {
          Backbone.$.ajaxSetup({
            headers: {'Authorization': "Bearer " + res.data.token}
          });
          var user = new User({id: res.data.userId});
          $.cookie("userID", res.data.userId);
          $.cookie("token", res.data.token);
          user.fetch({
            success: function () {
              this.topMenu.changeUser(user);
              $("#connexionModal").modal('hide');
            }
          });
        },
        error:    function (err) {
          alert("Server unreachable please try again!!");
        }
      });
    });
  }

  home() {
    console.log("Backckbone routes init");
  }

  mouseEvent() {
    let threeJSCanvas = $('#mainView');

    threeJSCanvas.mousedown(() => {
      console.log("mouseDown");
    });

    threeJSCanvas.mousemove(() => {
      console.log("mouseMove");
    });

    threeJSCanvas.mouseup(event => {
      let x = event.clientX - Constants.getCanvasSettings().width;
      let y = event.clientY - Constants.getCanvasSettings().height;

      let windowWidth  = window.innerWidth - Constants.getCanvasSettings().width;
      let windowHeight = window.innerHeight - Constants.getCanvasSettings().height;

      let mouse = {
        x: (x / windowWidth * 2) - 1,
        y: -(y / windowHeight * 2) + 1
      };

      GraphicalManager.setMouse(mouse);

      console.log("mouseUp");

    });

  }
}

export default Router;