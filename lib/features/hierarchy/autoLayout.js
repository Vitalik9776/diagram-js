export default function autoLayout(data) {
  const spacingX = 200;
  const spacingY = 120;
  const positioned = {};
  const levelMap = {};

  const rootId = data.nodes[0] && data.nodes[0].id;
  if (!rootId) {
    return data;
  }

  function assignLevels(id, level = 0) {
    if (!levelMap[level]) levelMap[level] = [];
    if (!positioned[id]) {
      positioned[id] = { id, level };
      levelMap[level].push(id);

      const children = data.edges
        .filter(e => e.source === id)
        .map(e => e.target);
      children.forEach(childId => assignLevels(childId, level + 1));
    }
  }

  assignLevels(rootId);

  data.nodes.forEach(node => {
    const info = positioned[node.id] || { level: 0 };
    const index = levelMap[info.level].indexOf(node.id);

    if (typeof node.x !== 'number') {
      node.x = index * spacingX;
    }
    if (typeof node.y !== 'number') {
      node.y = info.level * spacingY;
    }
  });

  return data;
}
