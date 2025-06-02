import MoveModule from '../move';
import InteractionEventsModule from '../interaction-events';
import ModelingModule from '../modeling';
import ContextPadModule from '../context-pad';

import HierarchyRenderer from './HierarchyRenderer';
import HierarchyModeling from './HierarchyModeling';
import HierarchyLayout from './HierarchyLayout';
import HierarchyStyles from './HierarchyStyles';
import HierarchyContextPadProvider from './HierarchyContextPadProvider';

/**
 * @type { import('didi').ModuleDeclaration }
 */
export default {
  __depends__: [
    MoveModule,
    InteractionEventsModule,
    ModelingModule,
    ContextPadModule
  ],
  __init__: [ 'hierarchyModeling', 'hierarchyRenderer', 'hierarchyContextPadProvider' ],
  hierarchyModeling: [ 'type', HierarchyModeling ],
  hierarchyRenderer: [ 'type', HierarchyRenderer ],
  hierarchyLayout: [ 'type', HierarchyLayout ],
  hierarchyStyles: [ 'type', HierarchyStyles ],
  hierarchyContextPadProvider: [ 'type', HierarchyContextPadProvider ]
};
