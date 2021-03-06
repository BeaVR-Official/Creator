/**
 * Created by Julien on 14/06/2016.
 */

/*
 * Dummy condition for test purpose of the script system, will always return true
 * The prototype respects the system design and must be used as a template
 */

export default class Condition {
  constructor() {
    this.uuid   = generateUUID();
    this.type = 0;
    this.data = null;
  }

  configure(data) {
    this.data = data;
    return (0);

  }

  isTrue(objectUuid, objectConfiguration) {
    return (true);
  }
}

function generateUUID() {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};