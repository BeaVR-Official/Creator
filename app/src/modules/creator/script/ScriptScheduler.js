/**
 * Created by Julien on 14/06/2016.
 */

import Event from './Event';
import Trigger from './Trigger';

class ScriptScheduler {
  constructor(triggerList, eventList) {
    this.triggerList         = triggerList;
    this.eventList           = eventList;
    this.activatedObjectList = [];
  }

  findTrigger(triggerUid) {
    for (let index = 0; index < this.triggerList.length; index++) {
      if (this.triggerList[index].uid === triggerUid) {
        return (index);
      }
    }
    return (-1);
  }

  findEvent(eventUid) {
    for (let index = 0; index < this.eventList.length; index++) {
      if (this.eventList[index].uid === eventUid) {
        return (index);
      }
    }
    return (-1);
  }

  findActivatedObject(objectUuid) {
    for (let index = 0; index < this.activatedObjectList.length; index++) {
      if (this.triggerList[index].uid === objectUuid) {
        return (index);
      }
    }
    return (-1);
  }

  activateObject(objectUuid) {
    if (this.findActivatedObject(objectUuid) !== -1) {
      for (let trigger in this.triggerList) {
        let objectIndex = trigger.findConnectedObject(objectUuid);
        if (objectIndex !== 1) {
          trigger.connectedObjectData[objectUuid].activated = true;
        }
      }
      this.activatedObjectList.push(objectUuid);
    }
  }

  deactivateObject(objectUuid) {
    let index = this.findActivatedObject(objectUuid);
    if (index !== -1) {
      for (let trigger in this.triggerList) {
        let objectIndex = trigger.findConnectedObject(objectUuid);
        if (objectIndex !== 1) {
          trigger.connectedObjectData[objectUuid].activated = false;
        }
      }
      this.activatedObjectList.splice(index, 1);
    }
  }

  checkAllTriggers() {
    for (let trigger in this.triggerList) {
      let triggeredObjects = trigger.checkTriggeredObjects();
      for (let objectUuid in triggeredObjects) {
        for (let eventUid in trigger.connectedObjectData[objectUuid].targets) {
          this.queueEvent(eventUid, objectUuid);
        }
      }
    }
  }

  executeInstruction(instruction, objectUuid, objectConfiguration) {
    instruction.execute(objectUuid, objectConfiguration);
  }

  queueEvent(eventUid, objectUuid) {
    // TODO: when Wait Instruction will be implemented, use the scheduler's worker to add the Event to the queue
    for (let instruction in this.eventList[eventUid].instructionList) {
      this.executeInstruction(instruction, objectUuid, this.eventList[eventUid].connectedObjectData[objectUuid].configuration);
    }
  }
}

export default new ScriptScheduler();