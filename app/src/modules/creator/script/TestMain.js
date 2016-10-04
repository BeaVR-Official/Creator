import ScriptOrganizer from "./ScriptOrganizer";
import ScriptScheduler from "./ScriptScheduler";
import Trigger from "./Trigger";

class TestMain {
  constructor() {
    this.triggerList = [];
    this.eventList = [];
  }

  testEditionMode() {
    /// will call all sort of methods relative to the creation and configuration of the script blocks
    /// Therefore, the UI shall follow the same usage

    /// The use case scenario is described in the documentation named "Nouvelle documentation UI Script.pdf"


    /// step 0 : The UI gets all the Triggers and Events stored in the Scene to be displayed, section "Manage Blocks"
    this.triggerList = ScriptOrganizer.getAllTriggers();
    this.eventList = ScriptOrganizer.getAllEvents();
    // In this example, we display the name of the first trigger contained in the list
    if (this.triggerList.length !== 0) {
      console.log(this.triggerList[0].name);
    }


    // step 1 : User clicked on an icon
    let newTriggerUuid = ScriptOrganizer.addTrigger("Action Example");

    // step 2 : The UI opens the Trigger, and the User attach a Condition to it
    let triggerIndex = ScriptOrganizer.findTrigger(newTriggerUuid);
    let exampleTrigger = ScriptOrganizer.triggerList[triggerIndex];
    // The type number (here 1) depends on the Condition ticked by the User
    let conditionUuid = exampleTrigger.addCondition(1);
    // if the condition has to be removed, we use exampleTrigger.removeCondition(conditionUuid);

  }

  testEditionMode() {
    /// will call all sort of methods relative to the execution of the script blocks

  }
}

export default new TestMain();