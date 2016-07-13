/**
 * Created by Julien on 14/06/2016.
 */

const Trigger = require('./Trigger.js').default;
const Event = require('./Event.js').default;

class ScriptOrganizer {

  constructor() {
    this.uuid        = generateUUID();
    this.triggerList = [];
    this.eventList   = [];
  }

  findTrigger(triggerUuid) {
    for (let index = 0; index < this.triggerList.length; index++) {
      if (this.triggerList[index].uuid === triggerUuid) {
        return (index);
      }
    }
    return (-1);
  }

  findEvent(eventUuid) {
    for (let index = 0; index < this.eventList.length; index++) {
      if (this.eventList[index].uuid === eventUuid) {
        return (index);
      }
    }
    return (-1);
  }

  /* Basic Trigger handling */

  addTrigger(name) {
    this.triggerList.push(new Trigger(name));
  }

  setTriggerName(triggerUid, name) {
    let index = this.findTrigger(triggerUid);
    if (index === -1) {
      return (-1);
    }
    this.triggerList[index].name = name;
    return (0);
  }

  removeTrigger(triggerUid) {
    let index = this.findTrigger(triggerUid);
    if (index === -1) {
      return (-1);
    }
    this.triggerList.splice(index, 1);
    return (0);
  }

  /* Methods for the management of the Condition of the Trigger */

  addCondition(triggerUid, type) {
    let index = this.findTrigger(triggerUid);
    if (index === -1) {
      return (-1);
    }
    this.triggerList[index].addCondition(type);
    return (0);
  }

  editCondition(triggerUid, conditionUid, data) {
    let index = this.findTrigger(triggerUid);
    if (index === -1) {
      return (-1);
    }
    return (this.triggerList[index].editCondition(conditionUid, data));
  }

  removeCondition(triggerUid, conditionUid) {
    let index = this.findTrigger(triggerUid);
    if (index === -1) {
      return (-1);
    }
    return (this.triggerList[index].removeCondition(conditionUid));
  }

  /* Basic Event handling */

  addEvent(name) {
    this.eventList.push(new Event(name));
  }

  setEventName(eventUid, name) {
    let index = this.findEvent(eventUid);
    if (index === -1) {
      return (-1);
    }
    this.eventList[index].name = name;
    return (0);
  }

  removeEvent(eventUid) {
    let index = this.findTrigger(eventUid);
    if (index === -1) {
      return (-1);
    }
    this.triggerList.splice(index, 1);
    return (0);
  }

  /* Methods for the management of the Instruction of the Event */

  addInstruction(eventUid, type) {
    let index = this.findEvent(eventUid);
    if (index === -1) {
      return (-1);
    }
    this.triggerList[index].addInstruction(type);
    return (0);
  }

  editInstruction(eventUid, instructionUid, data) {
    let index = this.findEvent(eventUid);
    if (index === -1) {
      return (-1);
    }
    return (this.eventList[index].editInstruction(instructionUid, data));
  }

  removeInstruction(eventUid, instructionUid) {
    let index = this.findEvent(eventUid);
    if (index === -1) {
      return (-1);
    }
    return (this.eventList[index].removeInstruction(instructionUid));
  }

  /* Methods for the connection and configuration of Three.Object to Trigger / Event */

  connectObject(triggerOrEventUid, objectUuid) {
    let index = this.findTrigger(triggerOrEventUid);
    if (index !== -1) {
      this.triggerList[index].addConnectedObject(objectUuid);
      return (0);
    }
    else {
      index = this.findEvent(triggerOrEventUid);
      if (index !== -1) {
        this.eventList[index].addConnectedObject(objectUuid);
        return (0);
      }
      else {
        return (-1);
      }
    }
  }

  disconnectObject(triggerOrEventUid, objectUuid) {
    let index = this.findTrigger(triggerOrEventUid);
    if (index !== -1) {
      return (this.triggerList[index].removeConnectedObject(objectUuid));
    }
    else {
      index = this.findEvent(triggerOrEventUid);
      if (index !== -1) {
        return (this.eventList[index].removeConnectedObject(objectUuid));
      }
      else {
        return (-1);
      }
    }
  }

  setConnectedObjectConfig(triggerOrEventUid, objectUuid, conditionOrInstructionUid, configData) {
    let index = this.findTrigger(triggerOrEventUid);
    if (index !== -1) {
      this.triggerList[index].setConnectedObjectConfig(objectUuid, conditionOrInstructionUid, configData);
      return (0);
    }
    else {
      index = this.findEvent(triggerOrEventUid);
      if (index !== -1) {
        this.eventList[index].setConnectedObjectConfig(objectUuid, conditionOrInstructionUid, configData);
        return (0);
      }
      else {
        return (-1);
      }
    }
  }

  addConnectedObjectTarget(triggerOrEventUid, objectUuid, targetObjectUuid, targetTriggerOrEventUid) {
    let index = this.findTrigger(triggerOrEventUid);
    if (index !== -1) {
      this.triggerList[index].addConnectedObjectTarget(objectUuid, targetObjectUuid, targetTriggerOrEventUid);
      return (0);
    }
    else {
      index = this.findEvent(triggerOrEventUid);
      if (index !== -1) {
        this.eventList[index].addConnectedObjectTarget(objectUuid, targetObjectUuid, targetTriggerOrEventUid);
        return (0);
      }
      else {
        return (-1);
      }
    }
  }

  removeConnectedObjectTarget(triggerOrEventUid, objectUuid, targetObjectUuid, targetTriggerOrEventUid) {
    let index = this.findTrigger(triggerOrEventUid);
    if (index !== -1) {
      return (this.triggerList[index].removeConnectedObjectTarget(objectUuid, targetObjectUuid, targetTriggerOrEventUid));
    }
    else {
      index = this.findEvent(triggerOrEventUid);
      if (index !== -1) {
        return (this.eventList[index].removeConnectedObjectTarget(objectUuid, targetObjectUuid, targetTriggerOrEventUid));
      }
      else {
        return (-1);
      }
    }
  }

  /* Generic methods used by the saving system (import export) and the UI */

  setAllTriggers(triggerList) {
    this.triggerList = triggerList;
  }

  setAllEvents(eventList) {
    this.eventList = eventList;
  }

  getAllTriggers() {
    return (this.triggerList);
  }

  getAllConditions(triggerUid) {
    let index = this.findTrigger(triggerUid);
    if (index === -1) {
      return (null);
    }
    return (this.triggerList[index].conditionList);
  }

  getAllEvents() {
    return (this.eventList);
  }

  getAllInstructions(eventUid) {
    let index = this.findEvent(eventUid);
    if (index === -1) {
      return (null);
    }
    return (this.eventList[index].instructionList);
  }
}

export default new ScriptOrganizer();


//temp
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};