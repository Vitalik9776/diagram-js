import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import GraphEngine from '../index.js';

function GraphCanvas(props, ref) {
  const { elements = [], layout = 'dagre', onSelect, onChange } = props;
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new GraphEngine({ container: containerRef.current });
    }

    const engine = engineRef.current;

    elements.forEach(el => {
      if (el.group === 'nodes') {
        engine.api.addNode(el);
      } else if (el.group === 'edges') {
        engine.api.addEdge(el);
      }
    });

    if (layout) {
      engine.diagram.get('graphLayout').runLayout({ name: layout });
    }

    if (onChange) {
      onChange(engine.api.getGraph());
    }
  }, [ elements, layout, onChange ]);

  useImperativeHandle(ref, () => ({
    engine: () => engineRef.current
  }), []);

  return <div ref={ containerRef } style={{ width: '100%', height: '100%' }} />;
}

export default forwardRef(GraphCanvas);
