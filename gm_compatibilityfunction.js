/**
 * 
 */




// //COMPATIBILITY ////

// Logging //
// If GM_log() not available, attempt to use other logging methods
if ('undefined' == typeof GM_log)
{
  // Firebug & Opera
  if ('undefined' !== typeof console.info) {
    console.info('typeof console.info = ' + (typeof console.info));
    function GM_log(_message) { console.info(_message); }
  }
}

// GM_registerMenuCommand() //
if ('undefined' == typeof GM_registerMenuCommand)
{
  // Alternative not yet created
  function GM_registerMenuCommand(){
    // TODO: Elements placed into the page
  }
}

// GM_addStyle() //
// The same function as used within the Greasemonkey source
if ('undefined' == typeof GM_addStyle)
{
  function GM_addStyle(_css) {
    var head = document.getElementsByTagName("head")[0];
    if (head) {
      var style = document.createElement("style");
      style.textContent = _css;
      style.type = "text/css";
      head.appendChild(style);
    }
    return style;
  }
}


// Persistent Storage //
// Dilemma -- what to use when Greasemonkey's GM_[get|set]Value() not available

// Cookie storage::
// Decision: Cannot use cookies as cookies are sent to the server on *EVERY*
// page request
// Problem1: Will potentially(?) make the site seem sluggish
// Problem2: Potential privacy concern: will enable Neobux to track your usage
// of scripts

// HTML5 localStorage::
// Problem1: localStorage databases are scoped to an HTML5 origin, thus values
// stored when viewing http:// pages are not accessible via https:// pages (and
// vice versa)
// Problem2: Still a potential privacy problem as data stored by localStorage is
// also accessible by the page itself, but as the data does not get sent to the
// server every time a page is loaded there is less overhead and the fact that
// you are using a script is not "broadcasted"


// Will try using HTML5 localStorage to implement similar functionality as
// GM_get/setValue (lesser of the evils?)
if ('undefined' == typeof GM_setValue)
{
  function GM_setValue(_key, _value) {
    try {
      window.localStorage[_key] = _value;
    } catch(e) {
      GM_log("Error inside GM_setValue");
      GM_log(e);
    }
    // GM_log("Return from GM_setValue.\n" + _key + ":" + _value);
  }
}

if ('undefined' == typeof GM_getValue)
{
  function GM_getValue(_key, _value) {
    // GM_log('Get Item:' + _key);
    // Store item in local storage:
    if ('undefined' !== typeof window.localStorage[_key] && 'undefined' !== window.localStorage[_key]) {
      // if ("false" === window.localStorage[_key]) {
      // return false;
      // } else if ("true" === window.localStorage[_key]) {
      // return true;
      // } else {
      return window.localStorage[_key];
      // }
    } else {
      GM_log("GM_getValue: Could not find _key:" + _key);
      if ('undefined' !== typeof _value) {
        GM_log("GM_getValue: setting default _value");
        GM_setValue(_key, _value);
        GM_log("GM_getValue: returning default _value");
        return _value;
      } else {
        GM_log("GM_getValue: no default _value set");
        return undefined;
      }
    }
  }
}

