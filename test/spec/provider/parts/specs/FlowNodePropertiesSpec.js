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

describe('flow-node-properties', function() {

  var diagramXML = require('../diagrams/FlowNodePropertyTest.bpmn');

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

  it('should set the asyncBefore property of a gateway flow node', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('InclusiveGateway_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var asyncBefore = domQuery('input[name=asyncBefore]', propertiesPanel._container),
        taskBo      = getBusinessObject(shape);

    // if
    expect(taskBo.get("asyncBefore")).to.not.be.ok;
    TestHelper.triggerEvent(asyncBefore, 'click');

    // then
    taskBo = getBusinessObject(shape);
    expect(taskBo.get("asyncBefore")).to.be.ok;
  }));

  it('should set the asyncBefore property of a event flow node', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('IntermediateThrowEvent_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var asyncBefore = domQuery('input[name=asyncBefore]', propertiesPanel._container),
        taskBo      = getBusinessObject(shape);

    // if
    expect(taskBo.get("asyncBefore")).to.not.be.ok;
    TestHelper.triggerEvent(asyncBefore, 'click');

    // then
    taskBo = getBusinessObject(shape);
    expect(taskBo.get("asyncBefore")).to.be.ok;
  }));

  it('should set the asyncBefore property of a activity flow node', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_2');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var asyncBefore = domQuery('input[name=asyncBefore]', propertiesPanel._container),
      taskBo      = getBusinessObject(shape);

    // if
    expect(taskBo.get("asyncBefore")).to.not.be.ok;
    TestHelper.triggerEvent(asyncBefore, 'click');

    // then
    taskBo = getBusinessObject(shape);
    expect(taskBo.get("asyncBefore")).to.be.ok;
  }));

  it('should set the asyncAfter property of a gateway flow node', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('InclusiveGateway_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var asyncAfter = domQuery('input[name=asyncAfter]', propertiesPanel._container),
        taskBo      = getBusinessObject(shape);

    // if
    expect(taskBo.get("asyncAfter")).to.not.be.ok;
    TestHelper.triggerEvent(asyncAfter, 'click');

    // then
    taskBo = getBusinessObject(shape);
    expect(taskBo.get("asyncAfter")).to.be.ok;
  }));

  it('should set the asyncAfter property of a event flow node', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('IntermediateThrowEvent_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var asyncAfter = domQuery('input[name=asyncAfter]', propertiesPanel._container),
        taskBo      = getBusinessObject(shape);

    // if
    expect(taskBo.get("asyncAfter")).to.not.be.ok;
    TestHelper.triggerEvent(asyncAfter, 'click');

    // then
    taskBo = getBusinessObject(shape);
    expect(taskBo.get("asyncAfter")).to.be.ok;
  }));

  it('should set the asyncAfter property of a activity flow node', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_2');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var asyncAfter = domQuery('input[name=asyncAfter]', propertiesPanel._container),
        taskBo      = getBusinessObject(shape);

    // if
    expect(taskBo.get("asyncAfter")).to.not.be.ok;
    TestHelper.triggerEvent(asyncAfter, 'click');

    // then
    taskBo = getBusinessObject(shape);
    expect(taskBo.get("asyncAfter")).to.be.ok;
  }));

  it('should fetch the exclusive property for a flow node', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_2');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var input = domQuery('input[name=exclusive]', propertiesPanel._container),
      businessObject = getBusinessObject(shape);

    // then
    expect(input.checked).to.equal(businessObject.get('exclusive'));
  }));

  it('should set the exclusive property for a flow node', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_2');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var input = domQuery('input[name=exclusive]', propertiesPanel._container);

    TestHelper.triggerEvent(input, 'click');

    var  businessObject = getBusinessObject(shape);

    // then
    expect(input.checked).to.equal(businessObject.get('exclusive'));
    expect(businessObject.get('exclusive')).to.not.be.ok;
  }));

  it('should reset the exclusive property for a flow node', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('CallActivity_2');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var exclusiveInput = domQuery('input[name=exclusive]', propertiesPanel._container),
        asyncBeforeInput = domQuery('input[name=asyncBefore]', propertiesPanel._container);

    TestHelper.triggerEvent(asyncBeforeInput, 'click'); // make the exclusive field visible

    TestHelper.triggerEvent(exclusiveInput, 'click'); // change value of the exclusive field

    TestHelper.triggerEvent(asyncBeforeInput, 'click'); // reset the exclusive field

    var  businessObject = getBusinessObject(shape);

    // then
    expect(exclusiveInput.checked).to.equal(businessObject.get('exclusive'));
    expect(businessObject.get('exclusive')).to.be.ok;
  }));
});
