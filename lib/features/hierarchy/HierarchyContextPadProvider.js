export default function HierarchyContextPadProvider(contextPad) {
  this._contextPad = contextPad;

  contextPad.registerProvider(this);
}

HierarchyContextPadProvider.$inject = ['contextPad'];

HierarchyContextPadProvider.prototype.getContextPadEntries = function(element) {
  if (element.type !== 'hierarchy:node') {
    return {};
  }

  return {
    log: {
      className: 'log-entry',
      title: 'Log element',
      action: {
        click: function() {
          // log element to console
          console.log('context pad clicked for', element.id);
        }
      }
    }
  };
};
