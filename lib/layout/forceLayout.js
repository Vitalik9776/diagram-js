export default function forceLayout(nodes, edges) {
  const width = 500;
  const height = 400;

  const positions = {};
  nodes.forEach(n => {
    positions[n.id] = {
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      vx: 0,
      vy: 0
    };
  });

  const iterations = 200;
  const repulsion = 5000;
  const attraction = 0.01;
  const restLength = 150;

  const nodeIds = nodes.map(n => n.id);

  for (let k = 0; k < iterations; k++) {
    nodeIds.forEach(id => {
      positions[id].vx = 0;
      positions[id].vy = 0;
    });

    for (let i = 0; i < nodeIds.length; i++) {
      for (let j = i + 1; j < nodeIds.length; j++) {
        const a = positions[nodeIds[i]];
        const b = positions[nodeIds[j]];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const force = repulsion / (dist * dist);
        const fx = force * dx / dist;
        const fy = force * dy / dist;
        a.vx -= fx;
        a.vy -= fy;
        b.vx += fx;
        b.vy += fy;
      }
    }

    edges.forEach(e => {
      const a = positions[e.connection.source.id];
      const b = positions[e.connection.target.id];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const force = attraction * (dist - restLength);
      const fx = force * dx / dist;
      const fy = force * dy / dist;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    });

    nodeIds.forEach(id => {
      const p = positions[id];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.85;
      p.vy *= 0.85;
    });
  }

  const result = {};
  nodeIds.forEach(id => {
    const p = positions[id];
    result[id] = { x: p.x, y: p.y };
  });

  return result;
}
