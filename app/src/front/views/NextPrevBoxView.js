/**
 * Created by ekersale on 12/11/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import EventManager from '../../modules/common/EventManager';

require('../../../assets/styles/NextPrevBox.scss');

class NextPrevBoxView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.NextPrevBox);
  }

  get $el() {
    return $('.NextPrevBoxSelector');
  }

  get events() {
    return {
      'click #next': 'next',
      'click #prev': 'previous',
      'click #translate': function () { this.transformMode("translate"); },
      'click #rotate': function () { this.transformMode("rotate"); },
      'click #scale': function () { this.transformMode("scale"); }
    };
  }

  constructor() {
    super();
    this.render();
  }

  next() {

  }

  previous() {

  }

  transformMode(mode) {
    EventManager.emitEvent("changeTransformControlMode", mode);
  }

  render() {
    this.$el.html(this.template());
    return this;
  }

}

export default NextPrevBoxView;