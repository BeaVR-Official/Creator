import UUID from './../utils/UUID';
import Enum from './../utils/Enum';

class ResourceDescriptor {
  constructor() {
    this.uuid = UUID.createUUID();
    //TODO: populate the class
  }
}

ResourceDescriptor.types = Enum({
  geometry: 'geometry',
  material: 'material',
  texture: 'texture',
  transparency: 'transparency',
  bumpmap: 'bumpmap'
});

export default ResourceDescriptor;