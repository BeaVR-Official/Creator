import ScriptOrganizer from "../../creator/script/ScriptOrganizer";
import ScriptScheduler from "../../creator/script/ScriptScheduler";
import Trigger from "../../creator/script/Trigger";

class TestMain {
  constructor() {
    this.triggerList = [];
    this.eventList = [];
  }

  testEditionMode() {
    /// will call all sort of methods relative to the creation and configuration of the script blocks
    /// Therefore, the UI shall follow the same usage. The instructions follow the order of the actions specified
    /// in the case scenario (described in the documentation named "Nouvelle documentation UI Script.pdf")


    // HOW TO GET THE NAME AND UUID OF ALL THE TRIGGERS OR EVENTS
    for (let trigger of ScriptOrganizer.getAllTriggers()) {
      console.log(trigger.name);
      console.log(trigger.uuid);
    }
    for (let event of ScriptOrganizer.getAllEvents()) {
      console.log(event.name);
      console.log(event.uuid);
    }

    // HOW TO CREATE A TRIGGER:
    let newTriggerUuid = ScriptOrganizer.addTrigger("Action Example");

    // HOW TO GET THE TRIGGER OBJECT USING ITS UUID
    let triggerIndex = ScriptOrganizer.findTrigger(newTriggerUuid);
    let exampleTrigger = ScriptOrganizer.triggerList[triggerIndex];

    // HOW TO GET THE TYPE AND DATA OF ALL THE CONDITIONS CONTAINED IN A TRIGGER
    for (let condition of ScriptOrganizer.getAllConditions(newTriggerUuid)) {
      console.log(condition.type);
      console.log(condition.data);
    }
    // NOTE: The data format may change from a condition type to another !

    // HOW TO ADD A CONDITION TO A TRIGGER
    let newConditionUuid = ScriptOrganizer.addCondition(newTriggerUuid, 1);
    // NOTE: if the condition has to be removed:
    // ScriptOrganizer.removeCondition(newTriggerUuid, conditionUuid);

    // HOW TO EDIT THE BASIC SETTINGS OF A CONDITION
    let conditionData = 10.0; // here, the data is simply the distance from which the condition should be triggered
    ScriptOrganizer.editCondition(newTriggerUuid, newConditionUuid, conditionData);

    // HOW TO CONNECT A TRIGGER AND A 3D OBJECT
    // Note: Nothing is changed in the 3D object, everything is stored in the Triggers/Events
    let randomObjectUuid = "wh473v3r-uu1d-c0d3"; // Example of a 3D Object UUID
    ScriptOrganizer.connectObject(newTriggerUuid, randomObjectUuid);

    // HOW TO EDIT THE CONNECTION SETTINGS OF A CONDITION OR AN INSTRUCTION (WORKS FOR BOTH!)
    // NOTE: these settings are only used by some condition when connected to an object (like Proximity in this example)
    let exampleTargetObject = "4n07h3r-uu1d-c0d3"; // Example of a 3D Object UUID targeted by the Condition Proximity
    ScriptOrganizer.setConnectedObjectConfig(newTriggerUuid, randomObjectUuid, newConditionUuid, exampleTargetObject);

    // HOW TO ADD A TARGET TO A TRIGGER
    // When a Trigger is connected to an Object, a Target has to be specified: an Object connected to an Event
    let exampleEventUuid = ScriptOrganizer.addEvent("Reaction Example"); // Event used as a target
    ScriptOrganizer.connectObject(exampleEventUuid, exampleTargetObject); // connection of the Event to the 3D Object
    ScriptOrganizer.addConnectedObjectTarget(newTriggerUuid, randomObjectUuid, exampleTargetObject, exampleEventUuid);
  }

  testEditionMode() {
    /// will call all sort of methods relative to the execution of the script blocks

  }
}

export default new TestMain();