import Diagram from '../../Diagram';
import HierarchyModule from './index';
import data from './sampleData';

const canvasEl = document.querySelector('#canvas');

const diagram = new Diagram({
  canvas: { container: canvasEl },
  modules: [ HierarchyModule ]
});

diagram.get('hierarchyModeling').load(data);

// expose for console use
window.diagram = diagram;
