// Custom renderer for nodes and edges
import BaseRenderer from '../../lib/draw/Renderer.js';
import { append as svgAppend, attr as svgAttr, create as svgCreate } from 'tiny-svg';

export default {
  __init__: [ 'graphRenderer' ],
  graphRenderer: [ 'type', GraphRenderer ]
};

function GraphRenderer(eventBus, styles) {
  BaseRenderer.call(this, eventBus, 2000);
  this.styles = styles;
}

GraphRenderer.prototype = Object.create(BaseRenderer.prototype);

GraphRenderer.$inject = [ 'eventBus', 'styles' ];

GraphRenderer.prototype.drawShape = function(parentGfx, element) {
  let shape;

  if (element.type === 'node') {
    shape = svgCreate('rect');
    svgAttr(shape, { width: 80, height: 40, rx: 5, ry: 5 });
  }

  if (shape) {
    svgAppend(parentGfx, shape);
  }

  return shape;
};

GraphRenderer.prototype.drawConnection = function(parentGfx, element) {
  const path = svgCreate('path');
  svgAttr(path, { d: this.getConnectionPath(element) });
  svgAppend(parentGfx, path);
  return path;
};

GraphRenderer.prototype.getConnectionPath = function(connection) {
  const { waypoints } = connection;
  if (!waypoints || waypoints.length === 0) {
    return '';
  }
  return 'M' + waypoints.map(p => p.x + ',' + p.y).join('L');
};
