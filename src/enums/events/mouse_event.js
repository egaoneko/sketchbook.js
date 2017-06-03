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
 * DOMMouseScroll
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
  "mousewheel",
  "DOMMouseScroll"
]);

export default MOUSE_EVENT;
