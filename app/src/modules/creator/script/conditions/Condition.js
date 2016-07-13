/**
 * Created by Julien on 14/06/2016.
 */

/*
 * Dummy condition for test purpose of the script system, will always return true
 * The prototype respects the system design and must be used as a template
 */

export default class Condition {
  constructor(name) {
    this.uuid = guid;
    this.type = 0;
  }

  configure(data) {
    return (0);

  }

  isTrue(data) {
    return (true);
  }
}