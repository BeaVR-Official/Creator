/**
 * Created by giraud_d on 17/08/2016.
 */

import Loader from '../../utils';
import Object3D from '../../models/objectModel';
import Objects from '../../collections/objectCollection';
import Navigator from '../../../modules/creator/Navigator';
import BlockModel from '../../models/blockModel';
import * as Backbone from 'backbone';

import ScriptOrganizer from "../../../modules/creator/script/ScriptOrganizer";
import ScriptScheduler from "../../../modules/creator/script/ScriptScheduler";
import Trigger from "../../../modules/creator/script/Trigger";

class ActionBlockView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ActionBlock);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click #validate': 'createActionBlock'
    };
  }

  constructor(trigger) {
    super();
    this.trig = trigger;
  }

  initialize() { // en dur pour le moment
    this.actionBlock = new BlockModel({
      name:       'Default',
      conditions: {
        proximity: {
          enabled: false,
          value:   0
        },
        timer:     {
          enabled: false,
          value:   0
        },
        signal:    {
          enabled: false,
        },
        position:  {
          enabled: false,
          x:       0,
          y:       0,
          z:       0
        }
      }
    });
  }

  render() {
    if (this.trig !== undefined) {
      let triggerIndex   = ScriptOrganizer.findTrigger(this.trig);
      let exampleTrigger = ScriptOrganizer.triggerList[triggerIndex];

      this.actionBlock = new BlockModel({
        name:       exampleTrigger.name,
        conditions: {
          proximity: {
            enabled: false,
            value:   0
          },
          timer:     {
            enabled: false,
            value:   0
          },
          signal:    {
            enabled: false,
          },
          position:  {
            enabled: false,
            x:       0,
            y:       0,
            z:       0
          }
        }
      });

    }
    this.$el.html(this.template({
      actionBlock: this.actionBlock.toJSON()
    }));
    return this;
  }

  createActionBlock(e) {
    if (this.trig === undefined) {
      let newTriggerUuid = ScriptOrganizer.addTrigger(this.$('input[name="basicInfo[name]"]').val());

      if (this.$('input[name="proximity[activated]"]').is(':checked')) {
        let newConditionUuid = ScriptOrganizer.addCondition(newTriggerUuid, 0);
        ScriptOrganizer.editCondition(newTriggerUuid, newConditionUuid, this.$('input[name="proximity[distance]"]')
                                                                            .val());
      }
    }
  }

}

export default ActionBlockView;