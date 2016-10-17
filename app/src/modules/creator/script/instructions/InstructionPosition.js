export default class InstructionPosition {
  constructor() {
    this.uuid       = generateUUID();
    this.type       = 1;
    this.x          = undefined;
    this.y          = undefined;
    this.z          = undefined;
    this.isRelative = false;
  }

  configure(data) {
    // data content description:
    // type: [float, float, float]
    // value: time in seconds
    // example: 10.0
    this.x = parseFloat(data[0]);
    this.y = parseFloat(data[1]);
    this.z = parseFloat(data[2]);
    return (true);
  }

  execute(objectUuid, objectConfiguration) {
    let objA = Scene.getObjectByUuid(objectUuid);
    if (objA === undefined) {
      return;
    }
    if (this.isRelative !== true) {
      let objB = Scene.getObjectByUuid(objectConfiguration);
      if (objB === undefined) {
        return;
      }
      objA.position.set(this.x + objB.position.x,
                        this.y + objB.position.y,
                        this.z + objB.position.z);
    }
    else {
      objA.position.set(this.x, this.y, this.z);
    }
    objA.__dirtyPosition = true;
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