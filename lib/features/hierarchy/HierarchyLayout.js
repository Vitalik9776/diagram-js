import { connectRectangles } from '../../layout/ManhattanLayout';
import treeLayout from '../../layout/treeLayout.js';
import layeredLayout from '../../layout/layeredLayout.js';
import circularLayout from '../../layout/circularLayout.js';
import forceLayout from '../../layout/forceLayout.js';

export default function HierarchyLayout(modeling) {
  this._modeling = modeling;
  this._type = 'tree';
}

HierarchyLayout.$inject = [ 'modeling' ];

HierarchyLayout.prototype.setType = function(type) {
  this._type = type;
};

HierarchyLayout.prototype.layout = function(nodes, edges) {
  let positions;

  switch (this._type) {
  case 'layered':
    positions = layeredLayout(nodes, edges);
    break;
  case 'circular':
    positions = circularLayout(nodes);
    break;
  case 'force':
    positions = forceLayout(nodes, edges);
    break;
  case 'tree':
  default:
    positions = treeLayout(nodes, edges);
    break;
  }

  nodes.forEach(node => {
    const pos = positions[node.id];
    if (!pos) {
      return;
    }
    const delta = { x: pos.x - (node.x || 0), y: pos.y - (node.y || 0) };
    this._modeling.moveShape(node, delta);
  });

  edges.forEach(e => {
    const s = e.connection.source;
    const t = e.connection.target;

    const waypoints = connectRectangles(
      { x: s.x, y: s.y, width: s.width, height: s.height },
      { x: t.x, y: t.y, width: t.width, height: t.height },
      { x: s.x + s.width, y: s.y + s.height / 2 },
      { x: t.x, y: t.y + t.height / 2 },
      { preferredLayouts: [ 'h:h' ] }
    );

    this._modeling.updateWaypoints(e.connection, waypoints);
  });
};
