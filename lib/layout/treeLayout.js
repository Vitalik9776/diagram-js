export default function treeLayout(nodes, edges) {
  const spacingX = 200;
  const spacingY = 120;

  const childrenByParent = {};
  edges.forEach(e => {
    const source = e.connection.source.id;
    const target = e.connection.target.id;
    const arr = childrenByParent[source] || (childrenByParent[source] = []);
    arr.push(target);
  });

  const targets = new Set(edges.map(e => e.connection.target.id));
  const roots = nodes.filter(n => !targets.has(n.id));

  const positions = {};
  const levelIndex = {};

  const visit = (nodeId, level) => {
    const idx = levelIndex[level] || 0;
    levelIndex[level] = idx + 1;
    positions[nodeId] = { x: level * spacingX, y: idx * spacingY };

    const children = childrenByParent[nodeId] || [];
    children.forEach(childId => visit(childId, level + 1));
  };

  roots.forEach(r => visit(r.id, 0));

  return positions;
}
