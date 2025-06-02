export default function HierarchyStyles() {}

HierarchyStyles.prototype.getNodeStyle = function(node) {
  const strokeBySex = {
    'M': '#3498db',
    'F': '#e74c3c'
  };

  const stroke = strokeBySex[node.sex] || '#34495e';
  const fill = node.status === 'dead' ? '#f9f9f9' : '#ffffff';

  return { stroke, fill };
};
