import { connectRectangles } from '../../layout/ManhattanLayout';

export default function HierarchyLayout(modeling) {
  this._modeling = modeling;
}

HierarchyLayout.$inject = [ 'modeling' ];

HierarchyLayout.prototype.layout = function(nodes, edges) {
  const levelHeight = 120;
  const levelWidth = 200;

  const childrenByParent = {};
  edges.forEach(e => {
    const pid = e.connection.source.id;
    const arr = childrenByParent[pid] || (childrenByParent[pid] = []);
    arr.push(e.connection.target);
  });

  const rootNodes = nodes.filter(n => !edges.some(e => e.connection.target === n));

  const positionNode = (node, depth, index) => {
    const x = depth * levelWidth;
    const y = index * levelHeight;
    const delta = { x: x - (node.x || 0), y: y - (node.y || 0) };
    this._modeling.moveShape(node, delta);

    const children = childrenByParent[node.id] || [];
    children.forEach((child, i) => positionNode(child, depth + 1, i));
  };

  rootNodes.forEach((node, i) => positionNode(node, 0, i));

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
