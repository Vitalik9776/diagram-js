export default function layeredLayout(nodes, edges) {
  const spacingX = 200;
  const spacingY = 120;

  const indegree = {};
  const children = {};
  nodes.forEach(n => indegree[n.id] = 0);
  edges.forEach(e => {
    const s = e.connection.source.id;
    const t = e.connection.target.id;
    indegree[t] = (indegree[t] || 0) + 1;
    const arr = children[s] || (children[s] = []);
    arr.push(t);
  });

  const queue = [];
  const level = {};
  nodes.forEach(n => {
    if (!indegree[n.id]) {
      queue.push(n.id);
      level[n.id] = 0;
    }
  });

  const visited = new Set(queue);

  while (queue.length) {
    const id = queue.shift();
    const l = level[id];
    (children[id] || []).forEach(c => {
      if (--indegree[c] === 0 && !visited.has(c)) {
        level[c] = l + 1;
        visited.add(c);
        queue.push(c);
      }
    });
  }

  nodes.forEach(n => {
    if (level[n.id] === undefined) {
      level[n.id] = 0;
    }
  });

  const levelIndex = {};
  const positions = {};
  nodes.forEach(n => {
    const l = level[n.id];
    const idx = levelIndex[l] || 0;
    levelIndex[l] = idx + 1;
    positions[n.id] = { x: idx * spacingX, y: l * spacingY };
  });

  return positions;
}
