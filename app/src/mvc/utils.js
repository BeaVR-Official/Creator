/**
 * Created by kersal_e on 27/07/2016.
 */

class Loader {
  constructor() {
    this.templates = {};
  }

  loadTemplates(names, callback) {
    var that = this;

    var loadTemplate = function (index) {
      var name = names[index];
      $.get('templates/' + name + '.html', function (data) {
        that.templates[name] = data;
        index++;
        if (index < names.length) {
          loadTemplate(index);
        } else {
          callback();
        }
      });
    };
    loadTemplate(0);
  }

  get(name) {
    return this.templates[name];
  }
}

export default new Loader;