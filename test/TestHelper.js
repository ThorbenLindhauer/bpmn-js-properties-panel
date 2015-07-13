'use strict';

var TestHelper = module.exports = require('bpmn-js/test/helper');

TestHelper.insertCSS('diagram-js.css', require('diagram-js/assets/diagram-js.css'));
TestHelper.insertCSS('bpmn-embedded.css', require('bpmn-js/assets/bpmn-font/css/bpmn-embedded.css'));
TestHelper.insertCSS('properties.css', require('../assets/properties.css'));

TestHelper.insertCSS('diagram-js-testing.css',
  '.test-container .result { height: 500px; }' + '.bjs-container { height: 70% !important; }' + '.test-container > div'
);

/**
 * Triggers an change event
 * @param element on which the change should be triggered
 * @param eventType type of the event (e.g. click, change, ...)
 */
var triggerEvent = function(element, eventType) {
  var evt;
  if(document.createEvent) {
    try {
      // Chrome, Safari, Firefox
      evt = new MouseEvent(( eventType || 'change' ), { view: window, bubbles: true, cancelable: true });
    } catch (e) {
      // PhantomJS (wat!)
      evt = document.createEvent('MouseEvent');
      evt.initEvent(( eventType || 'change' ), true, true);
    }
    return element.dispatchEvent(evt);
  } else {
    // Welcome IE
    evt = document.createEventObject();
    return element.fireEvent('on' + eventType, evt);
  }

};

var triggerValue = function(element, value, eventType) {
  element.value = value;
  this.triggerEvent(element, eventType);
};

var triggerInput = function(element, value) {
  element.value = value;
  this.triggerEvent(element, 'input');
  element.focus();
};

module.exports.triggerEvent = triggerEvent;
module.exports.triggerValue = triggerValue;
module.exports.triggerInput = triggerInput;
