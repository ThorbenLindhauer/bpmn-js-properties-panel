'use strict';

var TestHelper = require('../../../../TestHelper');

var TestContainer = require('mocha-test-container-support');

/* global bootstrapModeler, inject */

var propertiesPanelModule = require('../../../../../lib'),
  domQuery = require('min-dom/lib/query'),
  domAttr = require('min-dom/lib/attr'),
  coreModule = require('bpmn-js/lib/core'),
  selectionModule = require('diagram-js/lib/features/selection'),
  modelingModule = require('bpmn-js/lib/features/modeling'),
  propertiesProviderModule = require('../../../../../lib/provider/camunda'),
  camundaModdlePackage = require('../../../../../lib/provider/camunda/camunda-moddle'),
  getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
  forEach = require('lodash/collection/forEach');

describe('call-activity-properties', function() {

  var diagramXML = require('../diagrams/CallActivtyPropertyTest.bpmn');

  var testModules = [
    coreModule, selectionModule, modelingModule,
    propertiesPanelModule,
    propertiesProviderModule
  ];

  var container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });

  beforeEach(bootstrapModeler(diagramXML, {
    modules: testModules,
    moddleExtensions: {camunda: camundaModdlePackage}
  }));


  beforeEach(inject(function(commandStack) {

    var undoButton = document.createElement('button');
    undoButton.textContent = 'UNDO';

    undoButton.addEventListener('click', function() {
      commandStack.undo();
    });

    container.appendChild(undoButton);
  }));

  it('should fetch a calledElement field', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var inputField = domQuery('input[name=calledElement]', propertiesPanel._container),
        businessObject = getBusinessObject(shape);

    // then
    expect(inputField.value).to.equal(businessObject.get('calledElement'));
  }));

  it('should fill a calledElement property', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var inputField = domQuery('input[name=calledElement]', propertiesPanel._container);

    TestHelper.triggerValue(inputField, 'foo', 'change');

    var businessObject = getBusinessObject(shape);

    // then

    expect(businessObject.get('calledElement')).to.equal('foo');
  }));

  it('should remove a calledElement property', inject(function(propertiesPanel, selection, elementRegistry) {
    // given
    var shape = elementRegistry.get('CallActivity_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var inputField = domQuery('input[name=calledElement]', propertiesPanel._container);

    TestHelper.triggerValue(inputField, '', 'change');

    var businessObject = getBusinessObject(shape);

    // then

    expect(businessObject.get('calledElement')).to.be.undefined;
  }));

  it('should fetch a calledElementBinding field', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_1'),
        elementSyntax = 'select[name=calledElementBinding]';


    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var selectedOption = domQuery(elementSyntax, propertiesPanel._container);

    // then
    expect(selectedOption.value).to.equal('version');
  }));

  it('should fill a calledElementBinding field', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_1'),
      elementSyntax = 'select[name=calledElementBinding]';


    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var selectField = domQuery(elementSyntax, propertiesPanel._container),
        option = domQuery(elementSyntax + ' > option[value=latest]', propertiesPanel._container);

    selectField.options[0].selected  = 'selected';
    TestHelper.triggerEvent(selectField, 'change');

    var businessObject = getBusinessObject(shape);

    // then
    expect(businessObject.get('calledElementBinding')).to.equal('latest');
  }));

  it('should remove a calledElementBinding property', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_1'),
      elementSyntax = 'select[name=calledElementBinding]';


    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var selectField = domQuery(elementSyntax, propertiesPanel._container),
      options = domQuery.all(elementSyntax + ' > option', propertiesPanel._container);

    forEach(options, function(option) {
      if(option.value == '') {
        domAttr(option, 'selected', 'selected');
      }
    });

    TestHelper.triggerEvent(selectField, 'change');

    var businessObject = getBusinessObject(shape);

    // then
    expect(businessObject.get('calledElementBinding')).to.be.undefined;
  }));

  it('should fetch a calledElementVersion field', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_1'),
      elementSyntax = 'input[name=calledElementVersion]';


    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var inputField = domQuery(elementSyntax, propertiesPanel._container);
    var businessObject = getBusinessObject(shape);

    // then
    expect(businessObject.get('calledElementVersion')).to.equal(parseInt(inputField.value));
    expect(parseInt(inputField.value)).to.equal(17);
  }));

  it('should fill a calledElementVersion field', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_1'),
      elementSyntax = 'input[name=calledElementVersion]';


    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var inputField = domQuery(elementSyntax, propertiesPanel._container);

    TestHelper.triggerValue(inputField, 42, 'change');

    var businessObject = getBusinessObject(shape);

    // then
    expect(businessObject.get('calledElementVersion')).to.equal('42');
  }));

  it('should remove a calledElementVersion field', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_1'),
      elementSyntax = 'input[name=calledElementVersion]';


    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var inputField = domQuery(elementSyntax, propertiesPanel._container);

    TestHelper.triggerValue(inputField, '', 'change');

    var businessObject = getBusinessObject(shape);

    // then
    expect(businessObject.get('calledElementVersion')).to.be.undefined;
  }));
});
