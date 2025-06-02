import inherits from 'inherits-browser';
import BaseRenderer from '../../draw/BaseRenderer';
import { append as svgAppend, attr as svgAttr, create as svgCreate } from 'tiny-svg';

const HIGH_PRIORITY = 1500;

export default function HierarchyRenderer(eventBus, styles, hierarchyStyles) {
  BaseRenderer.call(this, eventBus, HIGH_PRIORITY);
  this._styles = styles;
  this._hierarchyStyles = hierarchyStyles;
}

inherits(HierarchyRenderer, BaseRenderer);

HierarchyRenderer.$inject = [ 'eventBus', 'styles', 'hierarchyStyles' ];

HierarchyRenderer.prototype.canRender = function(element) {
  return element.type === 'hierarchy:node' || element.type === 'hierarchy:edge';
};

HierarchyRenderer.prototype.drawShape = function(parent, element) {
  const bo = element.businessObject || {};
  const style = this._hierarchyStyles.getNodeStyle(bo);

  const rect = svgCreate('rect');
  svgAttr(rect, {
    x: 0,
    y: 0,
    width: element.width,
    height: element.height,
    stroke: style.stroke,
    fill: style.fill,
    strokeWidth: 2,
    rx: 4,
    ry: 4
  });

  const text = svgCreate('text');
  svgAttr(text, { x: 8, y: 20, 'font-size': '12' });
  text.textContent = bo.label || '';

  svgAppend(parent, rect);
  svgAppend(parent, text);

  return rect;
};

HierarchyRenderer.prototype.drawConnection = function(parent, connection) {
  const path = connection.waypoints.map((p, idx) => (idx ? 'L' : 'M') + p.x + ',' + p.y).join(' ');
  const line = svgCreate('path');
  svgAttr(line, {
    d: path,
    stroke: '#555',
    strokeWidth: 1.5,
    fill: 'none'
  });
  svgAppend(parent, line);
  return line;
};

HierarchyRenderer.prototype.getShapePath = function(shape) {
  return [
    'M', shape.x, shape.y,
    'h', shape.width,
    'v', shape.height,
    'h', -shape.width,
    'z'
  ].join(' ');
};

HierarchyRenderer.prototype.getConnectionPath = function(connection) {
  return connection.waypoints.map((p, i) => (i ? 'L' : 'M') + p.x + ',' + p.y).join(' ');
};
