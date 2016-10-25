import UUID from './../utils/UUID';

export default class TriggerDescriptor {
  constructor() {
    this.uuid = UUID.createUUID();
  }
}