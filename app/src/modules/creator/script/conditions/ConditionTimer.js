export default class ConditionTimer {
  constructor() {
    this.uuid     = generateUUID();
    this.type     = 1;
    this.time = null;
  }

  configure(data) {
    // data content description:
    // type: float
    // value: time in seconds
    // example: 10.0
    let value = parseFloat(data);
    if (value < 0.0) {
      return (false);
    }
    this.time = value;
    return (true);

  }

  isTrue(objectUuid, objectConfiguration) {
    //empty objectConfiguration
    return true;
  }
}

function generateUUID() {
  let d    = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d     = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}