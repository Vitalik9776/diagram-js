// GraphEngine root export
// Provides initialization and high level API

import Diagram from '../../lib/Diagram.js';
import GraphEngineCore from './core/GraphEngineCore.js';
import GraphRendererModule from './renderer/GraphRenderer.js';
import GraphModelModule from './model/GraphModel.js';
import GraphLayoutModule from './layout/GraphLayout.js';
import GraphInteractionModule from './interaction/GraphInteraction.js';

// diagram-js modules loaded by the engine
const defaultModules = [
  GraphEngineCore,
  GraphRendererModule,
  GraphModelModule,
  GraphLayoutModule,
  GraphInteractionModule
];

export default class GraphEngine {
  constructor(options = {}) {
    const { container, modules = [] } = options;

    this.diagram = new Diagram({
      canvas: { container },
      modules: [ ...defaultModules, ...modules ]
    });

    // expose core API
    this.core = this.diagram.get('graphEngineCore');
  }

  get api() {
    return this.core;
  }
}
