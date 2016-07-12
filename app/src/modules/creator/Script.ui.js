/**
 * Created by urvoy_p on 11/07/16.
 */
class ScriptUI {

  constructor() {
    $('#scriptModal').modal({
      allowMultiple: true
    });
    $('#scriptConfModal').modal({
      allowMultiple: true
    });

    $('#scriptActions').dropdown();
    $('#scriptReactions').dropdown();
    $('.scriptConf').on('DOMNodeInserted', function(e) {
      $(e.target).click(() => {
        $('#scriptConfModal').modal('show');
      });
    });

  }

}

export default new ScriptUI();