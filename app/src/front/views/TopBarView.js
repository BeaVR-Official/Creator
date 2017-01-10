import Loader from '../utils';
import Backbone from 'backbone';

import Scene from '../models/scene';

import EventManager from '../../modules/common/EventManager';

import ProjectConfIn from './ProjectConfIn';

require('../../../assets/styles/TopBar.scss');

class TopBarView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.TopBar);
  }

  get $el() {
    return $('.TopBarSelector');
  }

  get events() {
    return {
      'dblclick #scene-tabs .tab': 'allowRenameTab',
      'click .tab':                'selectTab',
      'click .edit':               'renameTab',
      'click .close-cross':        'closeTab',
      'click .add-tab':            'addTab',
      'click .project-tab':        'showProjectInformations',
      'mousewheel':                'mousewheel'
    };
  }

  constructor() {
    super();
    this.render();
  }

  initialize() {
    this.tabArray = [];
  }

  mousewheel(event, delta) {
    var value = $("#scene-tabs").scrollLeft();
    $("#scene-tabs").scrollLeft(value -= (event.originalEvent.wheelDelta));
    event.preventDefault();
  }

  render() {
    this.$el.html(this.template());
    return this;
  }

  getNewTabName() {

    for (var i = 1; i < this.tabArray.length + 1; i++) {
      if ($.grep(this.tabArray, function(e){ return e.name == "Scene - " + i; }).length == 0)
        return ("Scene - " + i);
    }
    return ("Scene - " + i);
  }

  addTab() {
    let newTabName = this.getNewTabName();

    let data = {
      sceneName: newTabName,
      scene: undefined
    };
    EventManager.emitEvent('addScene', data).then((res) => {
      let scene = new Scene();
      scene.attributes = res.scene.attributes;
      this.tabArray.push(scene.attributes);

      // console.log("res addscene", scene);
      // console.log("tab array", this.tabArray);

      var tabsDiv          = $('#scene-tabs');
      tabsDiv[0].innerHTML = tabsDiv[0].innerHTML
        + '<a class=\"item tab\"'
        + 'data-tab=\"' + scene.attributes.uuid
        + '\">'
        + '<div class=\"ui disabled transparent input\">'
        + '<input type=\"text\" class=\"tab-input\" value=\"' + newTabName + '\">'
        + '<i class=\"hidden edit icon\"></i>'
        + '</div>'
        + '<span class=\"close-cross\">x</span></a>';

      /*
      var contentDiv          = $('#content');

      contentDiv[0].innerHTML = contentDiv[0].innerHTML
        + '<div class=\"ui bottom attached tab segment\"'
        + 'data-tab=\"' + scene.attributes.uuid + '\">'
        // + 'Contenu de l\'onglet ' + newTabId
        + '</div>';
        */
      $('.menu .item').tab();

      tabsDiv[0].children[this.tabArray.length - 1].click();
    });
  }

  selectTab(ev) {

    var tabs = $("#scene-tabs a");
    for (var i = 0; i < tabs.length; i++)
      tabs[i].classList.remove("active");
    var tabClassList = ev.target.classList;
    if ($.inArray('item', tabClassList) == -1)
      ev.target.parentElement.classList.add("active");
    else
      ev.target.classList.add("active");

    // var sceneDesc = ProjectManager.getSceneDescriptor(ev.currentTarget.attributes[1].value);
    // var index = this.tabArray.indexOf(sceneDesc.attributes);
    // console.log("TAB scene", sceneDesc);
    // console.log("TAB index", index);
    // console.log("TAB index", ev.currentTarget.attributes[1].value);
      EventManager.emitEvent('selectScene', ev.currentTarget.attributes[1].value);
      // console.log("Select Tab", this.tabArray[index]);
  }

  closeTab(ev) {

    if (confirm("Êtes vous sûr de vouloir fermer cette scène ? Toute modification non sauvegardée sera perdue.") == true)
    {
      var nodeList = Array.prototype.slice.call($('#scene-tabs')[0].children);
      var i        = nodeList.indexOf(ev.target.parentElement);

      var index = $.grep(this.tabArray, function(e){ return e.name == ev.target.parentElement.children[0].children[0].value; });
      var tabArrayIndex = this.tabArray.indexOf(index[0]);

      if (tabArrayIndex > -1) {
        this.tabArray.splice(tabArrayIndex, 1);
      }
      ev.target.parentElement.remove();

      if (nodeList.length <= 1)
        $('.project-tab').click();
      else {
        if ((i + 1) == nodeList.length)
          $('#scene-tabs')[0].children[i - 1].click();
        else
          $('#scene-tabs')[0].children[i].click();
      }

      $('.menu .item').tab();
    }
    else {

    }
    console.log(this.tabArray);

  }

  showProjectInformations() {
    if (this.pj != null){
      this.pj.remove();
      console.log("coucou");
    }
    this.pj = new ProjectConfIn();
  }

  allowRenameTab(ev) {
    if (ev.target.classList.contains("disabled")) {
      ev.target.parentElement.children[1].classList.add("hidden");
      ev.target.classList.remove("disabled");
      ev.target.children[1].classList.remove("hidden");
    }
  }

  renameTab(ev) {
    ev.target.parentElement.parentElement.children[1].classList.remove("hidden");
    ev.target.classList.add("hidden");
    ev.target.parentElement.classList.add("disabled");

    var input   = ev.target.parentElement.children[0];
    var newName = input.value;

    var index = this.tabArray.indexOf(input.defaultValue);
    if (index > -1)
      this.tabArray[index] = newName;

    input.defaultValue = newName;
    input.style.width  = ((input.value.length + 1) * 8) + "px";
  }
}

export default TopBarView;