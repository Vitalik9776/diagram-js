// GraphEngineCore provides basic graph manipulation API

export default {
  __init__: [ 'graphEngineCore' ],
  graphEngineCore: [ 'type', GraphEngineCore ]
};

/**
 * @param {Canvas} canvas
 * @param {ElementRegistry} elementRegistry
 * @param {Modeling} modeling
 * @param {CommandStack} commandStack
 */
function GraphEngineCore(canvas, elementRegistry, modeling, commandStack) {
  this.canvas = canvas;
  this.elementRegistry = elementRegistry;
  this.modeling = modeling;
  this.commandStack = commandStack;
}

GraphEngineCore.$inject = [ 'canvas', 'elementRegistry', 'modeling', 'commandStack' ];

GraphEngineCore.prototype.addNode = function(node) {
  // placeholder: add shape to canvas
  this.modeling.createShape(node, node.position, node.parent);
};

GraphEngineCore.prototype.addEdge = function(edge) {
  // placeholder: add connection between nodes
  this.modeling.connect(edge.source, edge.target, edge);
};

GraphEngineCore.prototype.removeElement = function(id) {
  const element = this.elementRegistry.get(id);
  if (element) {
    this.modeling.removeElements([ element ]);
  }
};

GraphEngineCore.prototype.getElement = function(id) {
  return this.elementRegistry.get(id);
};

GraphEngineCore.prototype.getGraph = function() {
  return {
    nodes: this.elementRegistry.filter(e => e.type === 'node'),
    edges: this.elementRegistry.filter(e => e.type === 'edge')
  };
};

GraphEngineCore.prototype.clear = function() {
  const elements = this.elementRegistry.getAll();
  this.modeling.removeElements(elements);
};
