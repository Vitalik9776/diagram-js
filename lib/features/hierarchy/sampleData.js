export default {
  nodes: [
    { id: 'n1', label: 'Имя 1', sex: 'M', status: 'alive' },
    { id: 'n2', label: 'Имя 2', sex: 'F', status: 'alive' },
    { id: 'n3', label: 'Имя 3', sex: 'M', status: 'dead' },
    { id: 'n4', label: 'Имя 4', sex: 'F', status: 'alive' }
  ],
  edges: [
    { source: 'n1', target: 'n2' },
    { source: 'n1', target: 'n3' },
    { source: 'n2', target: 'n4' }
  ]
};
