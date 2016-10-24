import UUID from './../../utils/UUID';

export default class ObjectDescriptor {
  constructor() {
    this.uuid = UUID.createUUID();
  }
}