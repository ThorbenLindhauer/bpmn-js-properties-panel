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

describe('prcoess-root-process-properties', function() {

  var diagramXML = require('../diagrams/ProcessPropertyRootProcessTest.bpmn');

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

  it('should set the isExecutable property of a process', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('Process_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var isExecutable = domQuery('input[name=isExecutable]', propertiesPanel._container),
        taskBo        = getBusinessObject(shape);

    // if
    expect(taskBo.get("isExecutable")).to.not.be.ok;
    TestHelper.triggerEvent(isExecutable, 'click');

    // then
    expect(taskBo.get("isExecutable")).to.be.ok;
  }));

  it('should get the name of a process', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('Process_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var name = domQuery('input[name=name]', propertiesPanel._container),
        shapeBo = getBusinessObject(shape);

    // then
    expect(shapeBo.get('name')).to.equal(name.value);
  }));

  it('should set the name of a process', inject(function(propertiesPanel, selection, elementRegistry) {

    // given
    var shape = elementRegistry.get('Process_1');

    propertiesPanel.attachTo(container);

    // when
    selection.select(shape);

    var name = domQuery('input[name=name]', propertiesPanel._container),
      shapeBo = getBusinessObject(shape);

    TestHelper.triggerValue(name, 'Foo', 'change');

    // then
    expect(shapeBo.get('name')).to.equal('Foo');
  }));
});
