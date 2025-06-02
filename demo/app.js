import Diagram from '../lib/Diagram';
import HierarchyModule from '../lib/features/hierarchy';
import MoveCanvasModule from '../lib/navigation/movecanvas';
import ZoomScrollModule from '../lib/navigation/zoomscroll';
import data from '../lib/features/hierarchy/sampleData';

const canvas = document.querySelector('#canvas');

const diagram = new Diagram({
  canvas: { container: canvas },
  modules: [ MoveCanvasModule, ZoomScrollModule, HierarchyModule ]
});

diagram.get('hierarchyModeling').load(data);

// show element details on click
const detailsPanel = document.querySelector('#details');
diagram.get('eventBus').on('element.click', ({ element }) => {
  const bo = element.businessObject || {};
  detailsPanel.innerHTML = `
    <h3>${bo.label || ''}</h3>
    <p>Status: ${bo.status || ''}</p>
    <p>Sex: ${bo.sex || ''}</p>
    <p>ID: ${element.id}</p>
  `;
});

// expose for console debugging
window.diagram = diagram;
