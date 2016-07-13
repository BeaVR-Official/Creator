/**
 * Created by Julien on 14/06/2016.
 */

import Condition from "./conditions/Condition";

export default class Trigger {
  constructor(name) {
    this.uid                 = guid();
    this.name                = name;
    this.conditionList       = [];
    this.connectedObjectList = [];
    this.connectedObjectData = {};
  }

  setName(name) {
    this.name = name;
  }

  /* Methods used by ScriptScheduler for execution process */

  checkConditions(objectUuid) {
    for (let condition in this.conditionList) {
      if (condition.isTrue(objectUuid, this.connectedObjectData[objectUuid].configuration) === false) {
        return (false);
      }
    }
    return (true);
  }

  checkTriggeredObjects() {
    let triggeredObjectList = [];
    for (let objectUuid in this.connectedObjectList) {
      if (this.connectedObjectData[objectUuid].activated === true &&
        this.checkConditions(objectUuid) === true) {
        triggeredObjectList.push([objectUuid]);
      }
    }
    return (triggeredObjectList);
  }

  /* Methods for Condition management */

  findCondition(conditionUid) {
    for (let index = 0; index < this.conditionList.length; index++) {
      if (this.conditionList[index].uid === conditionUid) {
        return (index);
      }
    }
    return (-1);
  }

  addCondition(type) {
    // TODO: add additional condition classes
    // TODO: verify the behaviour of the default case of the following switch, something is fishy...
    let condition;
    switch (type) {
    case 0:
      //TODO: remove this case, which is only used for test purpose
      condition = new Condition();
    default:
      condition = null;
    }
    if (condition === null) {
      return (-1);
    }
    this.conditionList.push(condition);
    return (0);
  }

  editCondition(conditionUid, data) {
    let index = this.findCondition(conditionUid);
    if (index === -1) {
      return (-1);
    }
    this.conditionList[index].configure(data);
  }

  removeCondition(conditionUid) {
    let index = this.findCondition(conditionUid);
    if (index === -1) {
      return (-1);
    }
    this.conditionList.splice(index, 1);
    // TODO: disconnect any object linked to this Condition
  }

  getAllConditions() {
    return (this.conditionList);
  }

  /* Methods for Connected object management */

  findConnectedObject(objectUuid) {
    for (let index = 0; index < this.connectedObjectList.length; index++) {
      if (this.connectedObjectList[index].uid === objectUuid) {
        return (index);
      }
    }
    return (-1);
  }

  addConnectedObject(objectUuid) {
    this.conditionList.push(objectUuid);
    this.connectedObjectData[objectUuid] = {
      "activated":     false,
      "configuration": {},
      "targets":       []
    };
  }

  removeConnectedObject(objectUuid) {
    let index = this.findConnectedObject(objectUuid);
    if (index === -1) {
      return (-1);
    }
    this.connectedObjectList().splice(index, 1);
    delete this.connectedObjectData[objectUuid];
    return (0);
  }

  setConnectedObjectConfig(objectUuid, conditionUid, data) {
    let index = this.findConnectedObject(objectUuid);
    if (index === -1) {
      return (-1);
    }
    this.connectedObjectData[objectUuid].configuration[conditionUid] = data;
    return (0);
  }

  addConnectedObjectTarget(objectUuid, targetObjectUuid, eventUid) {
    let index = this.findConnectedObject(objectUuid);
    if (index === -1) {
      return (-1);
    }
    this.connectedObjectData[objectUuid].targets.push([targetObjectUuid, eventUid]);
    return (0);
  }

  removeConnectedObjectTarget(objectUuid, targetObjectUuid, eventUid) {
    let index = this.findConnectedObject(objectUuid);
    if (index === -1) {
      return (-1);
    }
    for (let targetIndex = 0; this.connectedObjectData[objectUuid].targets.length; targetIndex++) {
      if ((this.connectedObjectData[objectUuid].targets[targetIndex][0] === targetObjectUuid) &&
        (this.connectedObjectData[objectUuid].targets[targetIndex][1] === eventUid)) {
        this.connectedObjectData[objectUuid].targets.splice(targetIndex, 1);
        return (0);
      }
    }
    return (-1);
  }

  getAllConnectedObjects() {
    return (this.connectedObjectList);
  }
}