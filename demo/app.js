import Diagram from '../lib/Diagram';
import HierarchyModule from '../lib/features/hierarchy';
import MoveCanvasModule from '../lib/navigation/movecanvas';
import ZoomScrollModule from '../lib/navigation/zoomscroll';

import ConnectModule from '../lib/features/connect';
import ContextPadModule from '../lib/features/context-pad';
import CreateModule from '../lib/features/create';
import HandToolModule from '../lib/features/hand-tool';
import LassoToolModule from '../lib/features/lasso-tool';
import SpaceToolModule from '../lib/features/space-tool';
import GlobalConnectModule from '../lib/features/global-connect';
import ModelingModule from '../lib/features/modeling';
import MoveModule from '../lib/features/move';
import OutlineModule from '../lib/features/outline';
import PaletteModule from '../lib/features/palette';
import RulesModule from '../lib/features/rules';
import SelectionModule from '../lib/features/selection';
import LabelSupportModule from '../lib/features/label-support';
import PopupMenuModule from '../lib/features/popup-menu';
import OverlaysModule from '../lib/features/overlays';
import TranslateModule from '../lib/i18n/translate';
import SnappingModule from '../lib/features/snapping';
import EditorActionsModule from '../lib/features/editor-actions';
import KeyboardModule from '../lib/features/keyboard';
import CroppingConnectionDocking from '../lib/layout/CroppingConnectionDocking';
import data from '../lib/features/hierarchy/sampleData';

const canvas = document.querySelector('#canvas');

const diagram = new Diagram({
  canvas: { container: canvas },
  modules: [
    { connectionDocking: [ 'type', CroppingConnectionDocking ] },
    MoveCanvasModule,
    ZoomScrollModule,
    ConnectModule,
    ContextPadModule,
    CreateModule,
    HandToolModule,
    LassoToolModule,
    SpaceToolModule,
    GlobalConnectModule,
    ModelingModule,
    MoveModule,
    OutlineModule,
    PaletteModule,
    RulesModule,
    SelectionModule,
    LabelSupportModule,
    PopupMenuModule,
    OverlaysModule,
    TranslateModule,
    SnappingModule,
    EditorActionsModule,
    KeyboardModule,
    HierarchyModule
  ]
});

diagram.get('hierarchyModeling').load(data);

const layoutSelector = document.querySelector('#layoutSelector');
layoutSelector.addEventListener('change', e => {
  const type = e.target.value;
  diagram.get('hierarchyLayout').setType(type);
  const data = diagram.get('hierarchyModeling').save();
  diagram.get('hierarchyModeling').load(data);
});

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

const saveBtn = document.querySelector('#save');
saveBtn.addEventListener('click', () => {
  const data = diagram.get('hierarchyModeling').save();
  const blob = new Blob([ JSON.stringify(data, null, 2) ], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'diagram.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
