export default function HierarchyContextPadProvider(contextPad, hierarchyModeling) {
  this._contextPad = contextPad;
  this._hierarchyModeling = hierarchyModeling;

  contextPad.registerProvider(this);
}

HierarchyContextPadProvider.$inject = ['contextPad', 'hierarchyModeling'];

HierarchyContextPadProvider.prototype.getContextPadEntries = function(element) {
  if (element.type !== 'hierarchy:node') {
    return {};
  }

  const self = this;

  return {
    log: {
      className: 'log-entry',
      title: 'Log element',
      action: {
        click: function() {
          console.log('context pad clicked for', element.id);
        }
      }
    },
    add: {
      className: 'add-child-entry',
      title: 'Add child',
      action: {
        click: function() {
          self._hierarchyModeling.addChild(element);
        }
      }
    },
    info: {
      className: 'info-entry',
      title: 'Show info',
      action: {
        click: function() {
          console.log('info for', element.id);
        }
      }
    }
  };
};
