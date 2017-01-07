/**
 * Created by ekersale on 23/11/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../node_modules/underscore';
import 'jquery-ui-bundle';
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
      'click .modals' : 'CloseModal'
    };
  }

  constructor() {
    super();
  }

  CloseModal(event) {
    console.log(event);
    if (event.target.className == "ui dimmer modals page transition hidden active visible" || event.target.className == "close icon") {
      $('.small.modal').removeClass('active');
      $('.small.modal').removeClass('visible');
      $('.modals').removeClass('active');
      $('.modals').removeClass('visible');
    }
  }

  switchLeftBarView(value) {
    console.log(value);
    this.default = (value.objects != undefined) ? value.objects : [];
    this.objects = this.default;
    this.type = (value.type != undefined)? value.type: "default";
    this.render();
  }

  addObject(event) {
    let addType = ($(event.target).closest('.addObject').attr('data-id'));
    if (addType == 'add') {

      $('.modals').addClass('active');
      $('.modals').addClass('visible');
      $('.modals').animateCssIn('fadeIn');
      $('.small.modal').addClass('active');
      $('.small.modal').addClass('visible');
      $('.small.modal').animateCssIn('zoomIn');
      /*
            $('.ui.small.modal').modal('show');
      */
      return;
    }
    let data = {
      objectName: '',
      objectType: addType
    };
    // TODO filtré entre les dif obj via un data.typeObj
    EventManager.emitEvent('addObject', data)
      .then((res) => {
      if (res.uuid)
          EventManager.emitEvent('objectSelected', {objectUuid: res.uuid});
      });
  }

   render() {
      this.$el.html(this.template({objects : this.objects, type: this.type}));
      return this;
   }
}

export default LeftBarView;

