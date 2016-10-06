/**
 * Created by giraud_d on 04/10/2016.
 */

class TopMenuUtils {

  constructor() {

  }

  setAndDisableActiveClass(idShow, idHide) {
    $(".tab.active").each(function () {
      $(this).removeClass('active');
    });
    $(idShow).addClass('active');
    $(idHide).removeClass('active');
    this.showSugarMaple(false);
  }

  /**
   * // En doublon
   * Changes state between panels (treeview & properties)
   * Treeview's displayed with a true arg value
   * @param arg
   */
  showSugarMaple(arg) {
    let treeviewPanel   = $('.treeview-left-panel');
    let propertiesPanel = $('.properties-left-panel');
    if (arg === true) {
      treeviewPanel.css("display", "block");
      propertiesPanel.css("display", "none");
    } else {
      treeviewPanel.css("display", "none");
      propertiesPanel.css("display", "block");
    }
  }
}

export default TopMenuUtils;