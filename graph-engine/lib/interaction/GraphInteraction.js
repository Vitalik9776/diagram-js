// Basic interaction hooks

export default {
  __init__: [ 'graphInteraction' ],
  graphInteraction: [ 'type', GraphInteraction ]
};

function GraphInteraction(eventBus) {
  this.eventBus = eventBus;

  // example: log element clicks
  eventBus.on('element.click', event => {
    console.log('click', event.element.id);
  });
}

GraphInteraction.$inject = [ 'eventBus' ];
