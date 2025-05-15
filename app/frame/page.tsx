//@ts-nocheck
'use client';
import { type XCanvas } from '@boardxus/canvasx-core';
import { Rect } from 'fabric';
import { NextPage } from 'next';
import { useRef, useCallback } from 'react';
import { Canvas } from '../../components/Canvas';

import { XFrame } from '@boardxus/canvasx-core';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });

      const frame = new XFrame(canvas, 'Frame Title', 100, 100, 400, 300);
      frame.canvas = canvas; // Assign the canvas to the frame instance

      const slide = new Rect({
        left: 150,
        top: 150,
        width: 200,
        height: 150,
        fill: 'white',
        stroke: 'black',
      });

      canvas.add(slide);

      canvas.zoomToViewAllObjects();
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
        <h2>Frame Demo Description</h2>
        <p>
          This page demonstrates the <b>XFrame</b> component from <b>@boardxus/canvasx-core</b>. Frames are used to group and organize content on the canvas, such as slides, diagrams, or collections of objects. The demo shows a frame with a sample slide inside.
        </p>
      </div>

      {/* Documentation Section */}
      <div style={{ marginBottom: 48, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>XFrame Documentation</h2>
        <h3>Overview</h3>
        <p>
          The <b>XFrame</b> widget allows you to create visual containers or frames on your CanvasX board. Frames can be used to group related objects, create slides, or visually separate sections of your canvas.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li><b>title</b>: string — The title displayed on the frame.</li>
          <li><b>x</b>, <b>y</b>: number — The position of the frame.</li>
          <li><b>width</b>, <b>height</b>: number — The dimensions of the frame.</li>
        </ul>
        <h3>Usage Example</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`const frame = new XFrame(canvas, 'My Frame', 100, 100, 400, 300);
frame.canvas = canvas;
canvas.add(frame);`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Use frames to organize slides, diagrams, or logical sections.</li>
          <li>Combine frames with notes, shapes, and images for presentations.</li>
          <li>Set unique titles for each frame for easy identification.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
