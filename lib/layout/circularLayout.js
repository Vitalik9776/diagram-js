export default function circularLayout(nodes) {
  const radius = 250;
  const angle = (2 * Math.PI) / nodes.length;
  const positions = {};

  nodes.forEach((n, i) => {
    positions[n.id] = {
      x: Math.cos(angle * i) * radius,
      y: Math.sin(angle * i) * radius
    };
  });

  return positions;
}
