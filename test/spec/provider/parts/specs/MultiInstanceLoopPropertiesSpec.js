'use strict';

var TestHelper = require('../../../../TestHelper');

var TestContainer = require('mocha-test-container-support');

/* global bootstrapModeler, inject */

var propertiesPanelModule = require('../../../../../lib'),
  domQuery = require('min-dom/lib/query'),
  coreModule = require('bpmn-js/lib/core'),
  selectionModule = require('diagram-js/lib/features/selection'),
  modelingModule = require('bpmn-js/lib/features/modeling'),
  propertiesProviderModule = require('../../../../../lib/provider/camunda'),
  camundaModdlePackage = require('../../../../../lib/provider/camunda/camunda-moddle'),
  getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

describe('multi-instance-loop-properties', function() {

  var diagramXML = require('../diagrams/MultiInstanceLoopProperty.bpmn');

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

  it('should fetch the loopCardinality for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var textField = domQuery('input[name=loopCardinality]', propertiesPanel._container),
        businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(textField.value).to.equal(businessObject.get('loopCardinality').get('body'));
  }));

  it('should set the loopCardinality for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // then
    selection.select(shape);

    var textField = domQuery('input[name=loopCardinality]', propertiesPanel._container);

    TestHelper.triggerValue(textField, 'foo', 'change');

    var businessObject = getBusinessObject(shape).get('loopCharacteristics');

    expect(textField.value).to.equal('foo');
    expect(businessObject.get('loopCardinality').get('body')).to.equal('foo');
  }));

  it('should remove the loopCardinality for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // then
    selection.select(shape);

    var textField = domQuery('input[name=loopCardinality]', propertiesPanel._container);

    TestHelper.triggerValue(textField, '', 'change');

    var businessObject = getBusinessObject(shape).get('loopCharacteristics');

    expect(textField.value).to.equal('');
    expect(businessObject.get('loopCardinality')).to.be.undefined;
  }));

  it('should fetch the completionCondition for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var textField = domQuery('input[name=completionCondition]', propertiesPanel._container),
      businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(textField.value).to.equal(businessObject.get('completionCondition').get('body'));
  }));

  it('should set the completionCondition for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // then
    selection.select(shape);

    var textField = domQuery('input[name=completionCondition]', propertiesPanel._container);

    TestHelper.triggerValue(textField, 'foo', 'change');

    var businessObject = getBusinessObject(shape).get('loopCharacteristics');

    expect(textField.value).to.equal('foo');
    expect(businessObject.get('completionCondition').get('body')).to.equal('foo');
  }));

  it('should remove the completionCondition for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // then
    selection.select(shape);

    var textField = domQuery('input[name=completionCondition]', propertiesPanel._container);

    TestHelper.triggerValue(textField, '', 'change');

    var businessObject = getBusinessObject(shape).get('loopCharacteristics');

    expect(textField.value).to.equal('');
    expect(businessObject.get('completionCondition')).to.be.undefined;
  }));

  it('should fetch the collection for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var textField = domQuery('input[name=collection]', propertiesPanel._container),
      businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(textField.value).to.equal(businessObject.get('collection'));
  }));

  it('should set the collection for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // then
    selection.select(shape);

    var textField = domQuery('input[name=collection]', propertiesPanel._container);

    TestHelper.triggerValue(textField, 'foo', 'change');

    var businessObject = getBusinessObject(shape).get('loopCharacteristics');

    expect(textField.value).to.equal('foo');
    expect(businessObject.get('collection')).to.equal('foo');
  }));

  it('should remove the collection for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // then
    selection.select(shape);

    var textField = domQuery('input[name=collection]', propertiesPanel._container);

    TestHelper.triggerValue(textField, '', 'change');

    var businessObject = getBusinessObject(shape);

    expect(textField.value).to.equal('');
    expect(businessObject.get('collection')).to.be.undefined;
  }));

  it('should fetch the multi instance async before property for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var input = domQuery('input[name=loopAsyncBefore]', propertiesPanel._container),
        businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(input.checked).to.equal(!!businessObject.get('asyncBefore'));
    expect(input.checked).to.be.ok;
  }));

  it('should set the multi instance async before property for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var input = domQuery('input[name=loopAsyncBefore]', propertiesPanel._container);

    TestHelper.triggerEvent(input, 'click');

    var businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(businessObject.get('asyncBefore')).to.not.be.ok;
    expect(input.checked).to.not.be.ok;
  }));

  it('should fetch the multi instance async after property for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var input = domQuery('input[name=loopAsyncAfter]', propertiesPanel._container),
      businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(input.checked).to.equal(!!businessObject.get('asyncAfter'));
    expect(input.checked).to.not.be.ok;
  }));

  it('should set the multi instance async after property for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var input = domQuery('input[name=loopAsyncAfter]', propertiesPanel._container);

    TestHelper.triggerEvent(input, 'click');

    var businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(businessObject.get('asyncBefore')).to.be.ok;
    expect(input.checked).to.be.ok
  }));

  it('should fetch the multi instance exclusive property for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var input = domQuery('input[name=loopExclusive]', propertiesPanel._container),
        businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(input.checked).to.equal(businessObject.get('exclusive'));
  }));

  it('should set the multi instance exclusive property for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var input = domQuery('input[name=loopExclusive]', propertiesPanel._container);

    TestHelper.triggerEvent(input, 'click');

    var  businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(input.checked).to.equal(businessObject.get('exclusive'));
    expect(businessObject.get('exclusive')).to.not.be.ok;
  }));

  it('should reset the multi instance exclusive property for an element', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('ServiceTask');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var exclusiveInput = domQuery('input[name=loopExclusive]', propertiesPanel._container),
        asyncBeforeInput = domQuery('input[name=loopAsyncBefore]', propertiesPanel._container);

    TestHelper.triggerEvent(exclusiveInput, 'click'); // change the value of the exclusive field

    TestHelper.triggerEvent(asyncBeforeInput, 'click'); // reset the exclusive field

    var  businessObject = getBusinessObject(shape).get('loopCharacteristics');

    // then
    expect(exclusiveInput.checked).to.equal(businessObject.get('exclusive'));
    expect(businessObject.get('exclusive')).to.be.ok;
  }));

});
