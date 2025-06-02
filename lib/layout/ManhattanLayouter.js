import { getMid } from './LayoutUtil';
import { connectRectangles, repairConnection } from './ManhattanLayout';

/**
 * A layouter that uses manhattan routing for connections.
 *
 * @param {import('./ConnectionDocking').default} connectionDocking
 * @param {import('../core/EventBus').default} eventBus
 */
export default function ManhattanLayouter(connectionDocking, eventBus) {
  this._connectionDocking = connectionDocking;
  this._eventBus = eventBus;
}

ManhattanLayouter.$inject = [ 'connectionDocking', 'eventBus' ];

/**
 * Layout the given connection using manhattan routing.
 *
 * @param {import('../core/Types').ConnectionLike} connection
 * @param {import('./BaseLayouter').LayoutConnectionHints} [hints]
 *
 * @return {import('../util/Types').Point[]}
 */
ManhattanLayouter.prototype.layoutConnection = function(connection, hints) {
  hints = hints || {};

  const source = hints.source || connection.source;
  const target = hints.target || connection.target;

  const oldWaypoints = connection.waypoints || [];

  const start = hints.connectionStart || getMid(source);
  const end = hints.connectionEnd || getMid(target);

  let newWaypoints;

  if ((hints.connectionStart || hints.connectionEnd) && oldWaypoints.length) {
    newWaypoints = repairConnection(
      source,
      target,
      start,
      end,
      oldWaypoints,
      {
        connectionStart: !!hints.connectionStart,
        connectionEnd: !!hints.connectionEnd
      }
    );
  } else {
    newWaypoints = connectRectangles(source, target, start, end, hints);
  }

  // crop waypoints based on actual connection docking
  if (this._connectionDocking) {
    const tempConnection = Object.assign({}, connection, { waypoints: newWaypoints });
    newWaypoints = this._connectionDocking.getCroppedWaypoints(tempConnection, source, target);
  }

  return newWaypoints;
};
