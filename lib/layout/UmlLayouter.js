import { getMid } from './LayoutUtil';
import { connectRectangles, repairConnection } from './ManhattanLayout';

/**
 * Custom layouter that exposes additional behavior for UML diagrams.
 *
 * @param {import('./ConnectionDocking').default} connectionDocking
 * @param {import('../core/EventBus').default} eventBus
 * @param {import('../core/Canvas').default} canvas
 * @param {import('../draw/GraphicsFactory').default} graphicsFactory
 */
export default function UmlLayouter(connectionDocking, eventBus, canvas, graphicsFactory) {
  this.connectionDocking = connectionDocking;
  this.eventBus = eventBus;
  this._canvas = canvas;
  this._graphicsFactory = graphicsFactory;
}

UmlLayouter.$inject = [ 'connectionDocking', 'eventBus', 'canvas', 'graphicsFactory' ];

/**
 * Layout the connection by utilizing manhattan routing.
 * Includes logic for manually adjusted connections.
 *
 * @param {import('../core/Types').ConnectionLike} connection
 * @param {import('./BaseLayouter').LayoutConnectionHints} [hints]
 *
 * @return {import('../util/Types').Point[]}
 */
UmlLayouter.prototype.layoutConnection = function(connection, hints) {
  hints = hints || {};

  const source = connection.source;
  const target = connection.target;
  const oldWaypoints = connection.waypoints || [];

  // mark connection as custom when user moves a segment
  this.eventBus.on('connectionSegment.move.move', () => {
    if (!connection.businessObject.custom) {
      connection.businessObject.custom = true;
    }
  });

  if (
    connection.businessObject?.custom &&
    ((hints.connectionStart && !hints.connectionEnd) || (!hints.connectionStart && hints.connectionEnd))
  ) {
    const rawStart = hints.connectionStart !== false ? hints.connectionStart : oldWaypoints[0];
    const rawEnd = hints.connectionEnd !== false ? hints.connectionEnd : oldWaypoints[oldWaypoints.length - 1];

    let newWaypoints = repairConnection(
      source,
      target,
      rawStart,
      rawEnd,
      oldWaypoints,
      {
        connectionStart: !!hints.connectionStart,
        connectionEnd: !!hints.connectionEnd
      }
    );

    connection.waypoints = newWaypoints;
    newWaypoints = this.connectionDocking.getCroppedWaypoints(connection, source, target);
    return newWaypoints;
  }

  return connectRectangles(source, target, getMid(source), getMid(target));
};
