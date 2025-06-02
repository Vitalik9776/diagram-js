import MoveModule from '../move';
import InteractionEventsModule from '../interaction-events';
import ModelingModule from '../modeling';

import HierarchyRenderer from './HierarchyRenderer';
import HierarchyModeling from './HierarchyModeling';
import HierarchyLayout from './HierarchyLayout';
import HierarchyStyles from './HierarchyStyles';

/**
 * @type { import('didi').ModuleDeclaration }
 */
export default {
  __depends__: [
    MoveModule,
    InteractionEventsModule,
    ModelingModule
  ],
  __init__: [ 'hierarchyModeling', 'hierarchyRenderer' ],
  hierarchyModeling: [ 'type', HierarchyModeling ],
  hierarchyRenderer: [ 'type', HierarchyRenderer ],
  hierarchyLayout: [ 'type', HierarchyLayout ],
  hierarchyStyles: [ 'type', HierarchyStyles ]
};
