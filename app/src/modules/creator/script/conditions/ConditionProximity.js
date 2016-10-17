export default class ConditionProximity {
  constructor() {
    this.uuid     = generateUUID();
    this.type     = 1;
    this.distance = null;
  }

  configure(data) {
    // data content description:
    // type: float
    // value: trigger distance
    // example: 10.0
    let value = parseFloat(data);
    if (value < 0) {
      return (false);
    }
    this.distance = value;
    return (true);

  }

  isTrue(objectUuid, objectConfiguration) {
    //TODO: VERIFIER QU'IL S'AGIT DE LA BONNE METHODE DE RECUPERATION DES OBJETS!!!
    let objA = Scene.getObjectByUuid(objectUuid);
    let objB = Scene.getObjectByUuid(objectConfiguration);
    if (objA === undefined || objB === undefined) {
      return (false);
    }
    let x = objA.position.x - objB.position.x;
    let y = objA.position.y - objB.position.y;
    let z = objA.position.z - objB.position.z;
    if (Math.sqrt(x * x + y * y + z * z) <= this.distance) {
      return (true);
    }
    return (false);
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