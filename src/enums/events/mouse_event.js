import {Enum} from "enumify";

/**
 * click
 * contextmenu
 * dblclick
 * mousedown
 * mouseenter
 * mouseleave
 * mousemove
 * mouseover
 * mouseout
 * mouseup
 * mousewheel
 */
class MOUSE_EVENT extends Enum {
}

MOUSE_EVENT.initEnum([
  "click",
  "contextmenu",
  "dblclick",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseover",
  "mouseout",
  "mouseup",
  "mousewheel"
]);

export default MOUSE_EVENT;
