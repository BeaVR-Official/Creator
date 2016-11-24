/**
 * Created by ekersale on 23/11/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../node_modules/underscore';
import $ from 'jquery';
import Navigator from '../../modules/creator/Navigator';


require('../../../assets/styles/LeftBarSub.scss');

class LeftBarView extends Backbone.View {

  //static var menuCollection = null;

  get template() {
    return _.template(Loader.templates.LeftBarSub);
  }

  get events() {
    return {
        'click .headerSub .ui.button.inverted.basic': 'SwitchDefault'
    };
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
      'click .imageBox' : 'addObject'
    };
  }

  constructor(value) {

    super({});
    console.log(value);
    this.default = (value.objects != undefined) ? value.objects : [];
    this.objects = this.default;
    this.type = (value.type != undefined)? value.type: "default";
    this.render();
  }

  addObject(event) {
    console.log($(event.target).closest('.imageBox').attr('data-id'));
  }

   render() {
      this.$el.html(this.template({objects : this.objects, type: this.type}));
      return this;
   }
}

export default LeftBarView;
