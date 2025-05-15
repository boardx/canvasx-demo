//@ts-nocheck
'use client';
import { XCanvas } from '@boardxus/canvasx-core';
import { XRectNotes, XCircleNotes } from '@boardxus/canvasx-core';
import type { NextPage } from 'next';
import { useRef, useCallback } from 'react';
import { Canvas } from '../../components/Canvas';

const IndexPage: NextPage = () => {
  const ref = useRef<any>(null);

  const onLoad = useCallback(
    (canvas: any) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      const textValue = 'CanvasX Demo';

      // Create 10 RectNotes
      for (let i = 0; i < 3; i++) {
        const rectNote = new XRectNotes(textValue, {
          originX: 'center',
          top: 220 + i * 120,
          left: 200 + i * 120,
          originY: 'center',
          textAlign: 'center',
          backgroundColor: 'lightblue',
          id: Math.random().toString(36).substr(2, 9),
        });
        canvas.add(rectNote);
      }

      // Create 10 CircleNotes
      for (let i = 0; i < 3; i++) {
        const circleNote = new XCircleNotes(textValue, {
          originX: 'center',
          originY: 'center',
          top: 520 + i * 110,
          left: 520 + i * 110,
          textAlign: 'center',
          backgroundColor: 'yellow',
          id: Math.random().toString(36).substr(2, 9),
        });
        canvas.add(circleNote);
      }

      // Create 10 more RectNotes with different dimensions
      for (let i = 0; i < 3; i++) {
        const rectNote = new XRectNotes(textValue, {
          originX: 'center',
          top: 200 + i * 110,
          left: 600 + i * 110,
          width: 138,
          height: 138,
          textAlign: 'center',
          originY: 'center',
          backgroundColor: 'lightgreen',
          id: Math.random().toString(36).substr(2, 9),
        });
        canvas.add(rectNote);
      }

      // // Create 10 RectNotes
      // for (let i = 0; i < 5; i++) {
      //     const rectNote = new fabric.XShapeNotes(textValue, {
      //         originX: 'center',
      //         originY: 'center',
      //         top: 220,
      //         left: 200 + i * 250,
      //         textAlign: 'center',
      //         width: 200,
      //         height: 200,

      //         backgroundColor: 'lightblue',
      //         id: Math.random().toString(36).substr(2, 9),
      //     });
      //     canvas.add(rectNote);
      // }
    },
    [ref],
  );

  return (
    <div className="position-relative" style={{ minHeight: '80vh' }}>
      <div style={{ width: '100%', height: '80vh', margin: '0 auto', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fafbfc' }}>
        <Canvas ref={ref} onLoad={onLoad} />
      </div>

      {/* Description Section */}
      <div style={{ marginTop: 48, marginBottom: 16, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Aligning Guidelines</h2>
        <p>
          This page demonstrates the alignment guidelines feature for different widgets using <b>XRectNotes</b> and <b>XCircleNotes</b> from <b>@boardxus/canvasx-core</b>. When moving or arranging objects, alignment guidelines appear to help you visually align and distribute widgets on the canvas. This is useful for diagramming, layout, and precise positioning.
        </p>
        <h3>How to use it</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`import { initAligningGuidelines } from "fabric/extensions";

const config = {
  // distance from the shape does alignment begin?
  margin: 4,
  // guideline dimensions
  width: 1,
  // guideline color
  color: "rgba(255,0,0,0.9)",
  // close vertical line, default false
  closeVLine: false,
  // close horizontal line, default false
  closeHLine: false,
};

const deactivate = initAligningGuidelines(myCanvas, config);

// To disable alignment guidelines later:
deactivate();`}
        </pre>
        <h4>Custom function examples</h4>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`// Compare only with sibling elements
initAligningGuidelines(myCanvas, {
  getObjectsByTarget: function (target) {
    const set = new Set<FabricObject>();
    const p = target.parent ?? target.canvas;
    p?.getObjects().forEach((o) => set.add(o));
    return set;
  },
});

// Align only the TL control point
initAligningGuidelines(myCanvas, {
  getPointMap: function (target) {
    const tl = target.getCoords().tl;
    return { tl };
  },
});

// Custom controllers and control points
FabricObject.createControls = function () {
  // controllers
  return { controls: { abc: new Control({}) } };
};
initAligningGuidelines(myCanvas, {
  getPointMap: function (target) {
    const abc = target.getCoords().tl;
    return { abc };
  },
  getContraryMap: function (target) {
    const abc = target.aCoords.br;
    return { abc };
  },
  contraryOriginMap: {
    // if the top-left point, then the reference point is the bottom-right.
    abc: ["right", "bottom"],
  },
});

// Close all guidelines
initAligningGuidelines(myCanvas, {
  closeVLine: true,
  closeHLine: true,
  getPointMap: function (_) {
    return {};
  },
});`}
        </pre>
      </div>

      {/* Contributor Section */}
      <div style={{ marginBottom: 48, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Contributors</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="https://github.com/zhe-he" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <img src="https://github.com/zhe-he.png" alt="zhe-he avatar" style={{ width: 36, height: 36, borderRadius: '50%', marginRight: 8, border: '1px solid #eee' }} />
              <span>zhe-he</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
