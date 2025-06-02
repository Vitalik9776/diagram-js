# diagram-js

[![CI](https://github.com/bpmn-io/diagram-js/workflows/CI/badge.svg)](https://github.com/bpmn-io/diagram-js/actions?query=workflow%3ACI)

A toolbox for displaying and modifying diagrams on the web.


## Built with diagram-js

Some libraries / applications built on top of diagram-js:

#### Part of [bpmn.io](https://bpmn.io/)

* [bpmn-js](https://github.com/bpmn-io/bpmn-js) - A BPMN 2.0 viewer / modeler ([Demo](https://demo.bpmn.io/bpmn))
* [cmmn-js](https://github.com/bpmn-io/cmmn-js) - A CMMN 1.1 viewer / modeler ([Demo](https://demo.bpmn.io/cmmn))
* [dmn-js](https://github.com/bpmn-io/dmn-js) - A DMN 1.3 viewer / modeler / table editor ([Demo](https://demo.bpmn.io/dmn))

#### External

* [Apache Seata Saga Designer](https://github.com/apache/incubator-seata/tree/2.x/saga/seata-saga-statemachine-designer) - A visual orchestration tool for Seata Saga transaction ([Demo](https://seata.apache.org/saga-designer/))
* [archimate-js](https://github.com/archimodel/archimate-js) - An ArchiMate diagram viewer and editor ([Demo](https://archimodel.net))
* [chor-js](https://github.com/bptlab/chor-js) - A BPMN 2.0 Choreography diagram viewer and editor ([Demo](https://bpt-lab.org/chor-js-demo/))
* [Node Sequencer](https://github.com/philippfromme/node-sequencer) - A Node-Based Sequencer for the Web ([Demo](https://philippfromme.github.io/node-sequencer-demo/))
* [object-diagram-js](https://github.com/timKraeuter/object-diagram-js) - An object diagram viewer and editor ([Demo](https://timkraeuter.com/object-diagram-js/))
* [postit-js](https://github.com/pinussilvestrus/postit-js) - Create Post-it boards on a canvas editor ([Demo](https://postit-js-demo.netlify.app/))

## Resources

* [Issues](https://github.com/bpmn-io/diagram-js/issues)
* [Changelog](./CHANGELOG.md)
* [Contributing Guide](.github/CONTRIBUTING.md)
* [Examples](https://github.com/bpmn-io/diagram-js-examples)


## Development

Prepare the project by installing all dependencies:

```sh
npm install
```

Then, depending on your use-case you may run any of the following commands:

```sh
# build the library and run all tests
npm run all

# run the development setup
npm run dev

# run tests (single run)
npm test
```

Expose an environment variable `TEST_BROWSERS=(Chrome|Firefox)` to execute the tests in a non-headless browser.

> [!NOTE]
> We do not generate any build artifacts. Required parts of the library should be bundled by consuming libraries as needed instead.

## Hierarchy visualization example

A small module in `lib/features/hierarchy` demonstrates how to render hierarchical data.
Use it as follows:

```javascript
import Diagram from "diagram-js/lib/Diagram";
import autoLayout from "diagram-js/lib/features/hierarchy/autoLayout";
import HierarchyModule from "diagram-js/lib/features/hierarchy";
import data from "diagram-js/lib/features/hierarchy/sampleData";

import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import ZoomScrollModule from "diagram-js/lib/navigation/zoomscroll";

import ConnectModule from "diagram-js/lib/features/connect";
import ContextPadModule from "diagram-js/lib/features/context-pad";
import CreateModule from "diagram-js/lib/features/create";
import HandToolModule from "diagram-js/lib/features/hand-tool";
import LassoToolModule from "diagram-js/lib/features/lasso-tool";
import SpaceToolModule from "diagram-js/lib/features/space-tool";
import GlobalConnectModule from "diagram-js/lib/features/global-connect";
import ModelingModule from "diagram-js/lib/features/modeling";
import MoveModule from "diagram-js/lib/features/move";
import OutlineModule from "diagram-js/lib/features/outline";
import PaletteModule from "diagram-js/lib/features/palette";
import ResizeModule from "diagram-js/lib/features/resize";
import RulesModule from "diagram-js/lib/features/rules";
import SelectionModule from "diagram-js/lib/features/selection";
import LabelSupportModule from "diagram-js/lib/features/label-support";
import PopupMenuModule from "diagram-js/lib/features/popup-menu";
import OverlaysModule from "diagram-js/lib/features/overlays";
import TranslateModule from "diagram-js/lib/i18n/translate";
import SnappingModule from "diagram-js/lib/features/snapping";
import EditorActionsModule from "diagram-js/lib/features/editor-actions";
import KeyboardModule from "diagram-js/lib/features/keyboard";

const diagram = new Diagram({
  canvas: { container: document.querySelector("#canvas") },
  modules: [
    MoveCanvasModule,
    ZoomScrollModule,
    ConnectModule,
    ContextPadModule,
    CreateModule,
    HandToolModule,
    LassoToolModule,
    SpaceToolModule,
    GlobalConnectModule,
    ModelingModule,
    MoveModule,
    OutlineModule,
    PaletteModule,
    ResizeModule,
    RulesModule,
    SelectionModule,
    LabelSupportModule,
    PopupMenuModule,
    OverlaysModule,
    TranslateModule,
    SnappingModule,
    EditorActionsModule,
    KeyboardModule,
    HierarchyModule
  ]
});

autoLayout(data);
diagram.get("hierarchyModeling").load(data);
```

## Run demo locally

Start the webpack development server to experiment with the included example:

```sh
npm start
```

Open http://localhost:8080 in your browser to view the demo.

## License

MIT
