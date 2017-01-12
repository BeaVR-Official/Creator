/**
 * Created by ekersale on 23/11/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../node_modules/underscore';
import EventManager from '../../modules/common/EventManager'


require('../../../assets/styles/LeftBarSub.scss');

class LeftBarView extends Backbone.View {

  //static var menuCollection = null;

  get template() {
    return _.template(Loader.templates.LeftBarSub);
  }

  get $el() {
    return $('.LeftBarSubSelector');
  }

  SwitchDefault(event) {
    if ($(event.target).attr('id') == 'used') {
      this.objects = (this.used != undefined)? this.used : [];
      this.type = "used";
    }
    else{
      this.objects = (this.default != undefined) ? this.default : [];
      this.type = "default";
    }
    this.render();

  }

  get events() {
    return {
      'click .imageBox' : 'addObject',
      'click .headerSub .ui.button.inverted.basic': 'SwitchDefault',
      'click .modals' : 'CloseModal',
      'click .sendObj': 'UploadObj'
    };
  }

  constructor() {
    super();
  }

  UploadObj() {
    var path = (window.URL || window.webkitURL).createObjectURL($(".fileInput")[0].files[0]);
    var name = $("#modelName").val();
    this.objects.splice(this.objects.length - 1, 0, {name: name, logo:'assets/images/objectSpe.png', type:path, typeOfImport: 'imported'});
    $('.small.modal.addExtObject').removeClass('active');
    $('.small.modal.addExtObject').removeClass('visible');
    $('.modals.addExtObject').removeClass('active');
    $('.modals.addExtObject').removeClass('visible');
    this.render();

  }

  CloseModal(event) {
    if (event.target.className == "ui dimmer modals page transition hidden active visible" || 
        event.target.className == "close icon" ||
        event.target.className == "ui button close") {
      $('.small.modal.addExtObject').removeClass('active');
      $('.small.modal.addExtObject').removeClass('visible');
      $('.modals.addExtObject').removeClass('active');
      $('.modals.addExtObject').removeClass('visible');
    }
  }

  switchLeftBarView(value) {
    $('.LeftBarSubSelector').css('width', '220px');

    if (value.type === "TreeView") {
      $('#sceneTree').css('display', 'block');
    } else
      $('#sceneTree').css('display', 'none');

    this.default = (value.objects != undefined) ? value.objects : [];
    this.objects = this.default;
    this.type = (value.type != undefined)? value.type: "default";
    this.render();
  }

  addObject(event) {
    let addType = ($(event.target).closest('.addObject').attr('data-id'));
    let typeOfImport = ($(event.target).closest('.addObject').attr('data-type'));
    let resource = ($(event.target).closest('.addObject').attr('data-resource'));

    if (addType == 'add') {
      $('.modals.addExtObject').addClass('active');
      $('.modals.addExtObject').addClass('visible');
      $('.modals.addExtObject').animateCssIn('fadeIn');
      $('.small.modal.addExtObject').addClass('active');
      $('.small.modal.addExtObject').addClass('visible');
      $('.small.modal.addExtObject').animateCssIn('zoomIn');
      return;
    }
    console.log(typeOfImport);
    if (typeOfImport == 'default') {
      let data = {
        objectName: '',
        objectType: addType,
        resource: resource||""
      };
      // TODO filtré entre les dif obj via un data.typeObj
      EventManager.emitEvent('addObject', data);
    }
    else {
      let data = {
        objectName: '',
        objectType: ($(event.target).closest('.addObject').attr('data-name')),
        path: addType
      };
      EventManager.emitEvent('addExternal', data);
    }

  }

   render() {
      this.$el.html(this.template({objects : this.objects, type: this.type}));
      return this;
   }
}

export default LeftBarView;

