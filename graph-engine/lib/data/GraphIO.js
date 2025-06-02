// Simple JSON import/export helpers

export function exportJSON(engine) {
  return JSON.stringify(engine.api.getGraph(), null, 2);
}

export function importJSON(engine, json) {
  const data = JSON.parse(json);

  if (data.nodes) {
    data.nodes.forEach(n => engine.api.addNode(n));
  }

  if (data.edges) {
    data.edges.forEach(e => engine.api.addEdge(e));
  }
}
