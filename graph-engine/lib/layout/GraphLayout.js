// Placeholder layout module

export default {
  __init__: [ 'graphLayout' ],
  graphLayout: [ 'type', GraphLayout ]
};

function GraphLayout(canvas, graphicsFactory) {
  this.canvas = canvas;
  this.graphicsFactory = graphicsFactory;
}

GraphLayout.$inject = [ 'canvas', 'graphicsFactory' ];

GraphLayout.prototype.runLayout = function(options = {}) {
  // TODO: integrate dagre or klay layout
  // For now just noop
  return Promise.resolve();
};
