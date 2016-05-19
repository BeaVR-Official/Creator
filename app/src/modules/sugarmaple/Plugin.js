class Plugin {
  constructor() {
    if (this.constructor === Plugin) {
      throw new TypeError('Abstract class "Widget" cannot be instantiated directly.');
    }

    if (this.schema === undefined) {
      throw new TypeError('Classes extending the widget abstract class');
    }
  }
}