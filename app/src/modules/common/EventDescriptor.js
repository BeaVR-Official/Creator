import UUID from './../utils/UUID';

export default class EventDescriptor {
  constructor() {
    this.uuid = UUID.createUUID();
  }
}