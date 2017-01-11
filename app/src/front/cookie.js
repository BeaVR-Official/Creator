/**
 * Created by damien on 1/6/17.
 */

class Cookie {

  constructor() {}

  createCookie(name, value, exdays) {
    let date = new Date();
    date.setTime(date.getTime() + exdays * 24 *60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  getCookieValue(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}

export default new Cookie();