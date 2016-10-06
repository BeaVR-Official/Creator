/**
 * Created by giraud_d on 17/08/2016.
 */

import Loader from '../../utils';
import Object3D from '../../models/objectModel';
import Objects from '../../collections/objectCollection';
import Navigator from '../../../modules/creator/Navigator';
import * as Backbone from 'backbone';

class ActionBlockParamsView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ActionBlockParams);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {};
  }

  constructor(actionBlock) {
    super();
    this.actionBlock = actionBlock;
  }

  initialize() { // en dur pour le moment
  }

  render() {
    this.$el.html(this.template({
      actionBlock: this.actionBlock.toJSON()
    }));
    return this;
  }

}

export default ActionBlockParamsView;