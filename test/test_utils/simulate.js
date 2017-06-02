/**
 * simulate event
 */

const eventMatchers = {
  'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
  'MouseEvents': /^(?:click|contextmenu|dblclick|mouse(?:down|up|over|move|out|enter|leave|wheel))$/
};

const defaultOptions = {
  pointerX: 0,
  pointerY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true
};

/**
 * simulate event for test
 *
 * example : `simulate(document.getElementById("btn"), "click", { pointerX: 123, pointerY: 321 })`
 * {@link https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript}
 *
 * @param {Object} element element
 * @param {String} eventName event name
 * @returns {Object} elment
 */
function simulate (element, eventName) {
  let options = Object.assign(defaultOptions, arguments[2] || {});
  let Event, eventType;

  for (let name in eventMatchers) {
    if (!eventMatchers[name].test(eventName)) {
      continue;
    }
    eventType = name;
  }

  if (!eventType)
    throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

  if (document.createEvent) {
    Event = document.createEvent(eventType);
    if (eventType == 'HTMLEvents') {
      Event.initEvent(eventName, options.bubbles, options.cancelable);
    }
    else {
      Event.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
        options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
        options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
    }
    element.dispatchEvent(Event);
  }
  else {
    options.clientX = options.pointerX;
    options.clientY = options.pointerY;
    let evt = document.createEventObject();
    Event = Object.assign(evt, options);
    element.fireEvent('on' + eventName, Event);
  }
  return element;
}

export default simulate;
