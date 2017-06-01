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
  "mouseup"
]);

export default MOUSE_EVENT;
