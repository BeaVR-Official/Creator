export default class Condition {
  constructor() {
    this.uuid   = generateUUID();
    this.type = 1;
    this.distance = null;
  }

  configure(data) {
    let value = parseFloat(data);
    if (value < 0) {
      return (-1);
    }
    this.distance = value;
    return (0);

  }

  isTrue(objectUuid, objectConfiguration) {
    //TODO: Get position of the 2 objects, calculate the distance
    //TODO: and return true if closer than expected by this.distance
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