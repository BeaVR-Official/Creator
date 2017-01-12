/**
 * Created by ekersale on 20/11/2016.
 */

class Loader {

    constructor() {
        this.templates = {};
    }

    loadTemplates(names, callback) {
        let that = this;
        let loadTemplate = function (index) {
            let name = names[index];
            $.get('./src/front/templates/' + name + '.html', function (data) {
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

    initStyles() {
        $.fn.extend({
            animateCssIn: function (animationName) {
                let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                this.addClass('animated ' + animationName).one(animationEnd, function() {
                    $(this).removeClass('animated ' + animationName);
                });
            },
            animateCssOut: function (animationName, destinationModal, param = false) {
                let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                this.addClass('animated ' + animationName).one(animationEnd, function() {
                    if (param)
                        destinationModal.show(true);
                    else
                        destinationModal.show();
                });
            },
            dismissModal: function (animationName) {
                let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                this.addClass('animated ' + animationName).one(animationEnd, function() {
                    $('.modals').remove();
                });
            }
        });
    }
}

export default new Loader;