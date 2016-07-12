/**
 * Created by Julien on 14/06/2016.
 */

import Instruction from "./instructions/Instruction";

export default class Event {
  constructor(name) {
    this.uid                 = guid();
    this.name                = name;
    this.instructionList     = [];
    this.connectedObjectList = [];
    this.connectedObjectData = {};
  }

  setName(name) {
    this.name = name;
  }

  /* Methods for Instruction management */

  findInstruction(instructionUid) {
    for (let index = 0; index < this.instructionList.length; index++) {
      if (this.instructionList[index].uid === instructionUid) {
        return (index);
      }
    }
    return (-1);
  }

  addInstruction(type) {
    // TODO: add additional instruction classes
    // TODO: verify the behaviour of the default case of the following switch, something is fishy...
    let instruction;
    switch (type) {
    case 0:
      //TODO: remove this case, which is only used for test purpose
      instruction = new Instruction();
    default:
      instruction = null;
    }
    if (condition === null) {
      return (-1);
    }
    this.instructionList.push(instruction);
    return (0);
  }

  editInstruction(instructionUid, data) {
    let index = this.findInstruction(instructionUid);
    if (index === -1) {
      return (-1);
    }
    this.instructionList[index].configure(data);
  }

  removeInstruction(instructionUid) {
    let index = this.findInstruction(instructionUid);
    if (index === -1) {
      return (-1);
    }
    this.instructionList.splice(index, 1);
    // TODO: disconnect any object linked to this Instruction
  }

  getAllInstructions() {
    return (this.instructionList);
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
    this.instructionList.push(objectUuid);
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

  setConnectedObjectConfig(objectUuid, instructionUid, data) {
    let index = this.findConnectedObject(objectUuid);
    if (index === -1) {
      return (-1);
    }
    this.connectedObjectData[objectUuid]["configuration"][instructionUid] = data;
    return (0);
  }

  addConnectedObjectTarget(objectUuid, targetObjectUuid, triggerUid) {
    let index = this.findConnectedObject(objectUuid);
    if (index === -1) {
      return (-1);
    }
    this.connectedObjectData[objectUuid]["targets"].push([targetObjectUuid, triggerUid]);
    return (0);
  }

  removeConnectedObjectTarget(objectUuid, targetObjectUuid, triggerUid) {
    let index = this.findConnectedObject(objectUuid);
    if (index === -1) {
      return (-1);
    }
    for (let targetIndex = 0; this.connectedObjectData[objectUuid]["targets"].length; targetIndex++) {
      if ((this.connectedObjectData[objectUuid]["targets"][targetIndex][0] === targetObjectUuid) &&
        (this.connectedObjectData[objectUuid]["targets"][targetIndex][1] === triggerUid)) {
        this.connectedObjectData[objectUuid]["targets"].splice(targetIndex, 1);
        return (0);
      }
    }
    return (-1);
  }

  getAllConnectedObjects() {
    return (this.connectedObjectList);
  }
}