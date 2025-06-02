import autoLayout from './autoLayout';

export default function HierarchyModeling(canvas, modeling, eventBus, hierarchyLayout) {
  this._canvas = canvas;
  this._modeling = modeling;
  this._eventBus = eventBus;
  this._hierarchyLayout = hierarchyLayout;
}

HierarchyModeling.$inject = [ 'canvas', 'modeling', 'eventBus', 'hierarchyLayout' ];

HierarchyModeling.prototype.load = function(data) {
  // ensure nodes have coordinates via auto layout
  autoLayout(data);

  const root = this._canvas.getRootElement();
  const nodes = {};
  const edges = [];

  data.nodes.forEach(n => {
    const position = {
      x: typeof n.x === 'number' ? n.x : 100,
      y: typeof n.y === 'number' ? n.y : 100
    };
    const shape = this._modeling.createShape(
      { id: n.id, width: 150, height: 70, type: 'hierarchy:node', businessObject: n },
      position,
      root
    );
    nodes[n.id] = shape;
  });

  data.edges.forEach(e => {
    const connection = this._modeling.createConnection(
      nodes[e.source],
      nodes[e.target],
      { id: e.source + '-' + e.target, type: 'hierarchy:edge', waypoints: [], businessObject: e },
      root
    );
    edges.push({ data: e, connection });
  });

  this._nodes = nodes;
  this._edges = edges;

  this.layout();

  this._eventBus.fire('hierarchy.loaded', { nodes, edges });
};

HierarchyModeling.prototype.layout = function() {
  this._hierarchyLayout.layout(Object.values(this._nodes), this._edges);
  this._eventBus.fire('hierarchy.layouted');
};

HierarchyModeling.prototype.save = function() {
  const nodes = Object.values(this._nodes).map(n => {
    const bo = n.businessObject || {};
    return {
      id: n.id,
      label: bo.label,
      sex: bo.sex,
      status: bo.status,
      x: n.x,
      y: n.y
    };
  });

  const edges = this._edges.map(e => {
    const bo = e.connection.businessObject || {};
    return {
      source: e.connection.source.id,
      target: e.connection.target.id,
      label: bo.label
    };
  });

  return { nodes, edges };
};
