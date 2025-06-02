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
    const x = index * levelWidth;
    const y = depth * levelHeight;
    const delta = { x: x - (node.x || 0), y: y - (node.y || 0) };
    this._modeling.moveShape(node, delta);

    const children = childrenByParent[node.id] || [];
    children.forEach((child, i) => positionNode(child, depth + 1, i));
  };

  rootNodes.forEach((node, i) => positionNode(node, 0, i));

  edges.forEach(e => {
    const s = e.connection.source;
    const t = e.connection.target;
    const waypoints = [
      { x: s.x + s.width / 2, y: s.y + s.height },
      { x: t.x + t.width / 2, y: t.y }
    ];
    this._modeling.updateWaypoints(e.connection, waypoints);
  });
};
