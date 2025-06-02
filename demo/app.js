import Diagram from '../lib/Diagram';
import HierarchyModule from '../lib/features/hierarchy';
import data from '../lib/features/hierarchy/sampleData';

const canvas = document.querySelector('#canvas');

const diagram = new Diagram({
  canvas: { container: canvas },
  modules: [ HierarchyModule ]
});

diagram.get('hierarchyModeling').load(data);

// expose for console debugging
window.diagram = diagram;
