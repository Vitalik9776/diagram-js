// Model layer using elementRegistry as source of truth

export default {
  __init__: [ 'graphModel' ],
  graphModel: [ 'type', GraphModel ]
};

function GraphModel(elementRegistry) {
  this.elementRegistry = elementRegistry;
}

GraphModel.$inject = [ 'elementRegistry' ];

GraphModel.prototype.addNode = function(node) {
  node.businessObject = node.businessObject || {};
  node.businessObject.data = node.data;
};

GraphModel.prototype.addEdge = function(edge) {
  edge.businessObject = edge.businessObject || {};
  edge.businessObject.data = edge.data;
};

GraphModel.prototype.updateData = function(id, data) {
  const element = this.elementRegistry.get(id);
  if (element) {
    element.businessObject = element.businessObject || {};
    element.businessObject.data = data;
  }
};

GraphModel.prototype.getGraph = function() {
  const elements = this.elementRegistry.getAll();
  return {
    nodes: elements.filter(e => e.type === 'node'),
    edges: elements.filter(e => e.type === 'edge')
  };
};
