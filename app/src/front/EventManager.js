/**
 * Created by damien on 1/11/17.
 */

import eventToPromise from 'event-to-promise';
import Scene from './models/scene';
import TreeView from './views/LeftBarSugarMaple';

class EventManager extends EventEmitter {

  constructor() {
    super();
    this.eventsListener();
  }

  emitEvent(eventName, data) {
    this.emit(eventName, data);
    return eventToPromise(this, eventName).then(function () {
      return data;
    });
  }

  eventsListener() {
    this.on('loadScene', (sceneData) => {
      TreeView.loadATV(sceneData);
    });
  }

}

export default new EventManager();