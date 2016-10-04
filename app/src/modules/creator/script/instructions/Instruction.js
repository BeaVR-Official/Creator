/**
 * Created by Julien on 14/06/2016.
 */

/*
 * Dummy instruction for test purpose of the script system, won't execute anything if used
 * The prototype respects the system design and must be used as a template
 */

export default class Instruction {
  constructor() {
    this.uuid   = guid;
    this.type = 0;
  }

  configure(data) {
    return (0);

  }

  execute(objectUuid, objectConfiguration) {
    return (true);
  }
}