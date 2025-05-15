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
        <h2>Align Demo Description</h2>
        <p>
          This page demonstrates alignment and arrangement of notes using <b>XRectNotes</b> and <b>XCircleNotes</b> from <b>@boardxus/canvasx-core</b>. Multiple notes are placed on the canvas to showcase how objects can be distributed and visually aligned for diagramming and layout tasks.
        </p>
      </div>

      {/* Documentation Section */}
      <div style={{ marginBottom: 48, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Alignment & Arrangement Documentation</h2>
        <h3>Overview</h3>
        <p>
          CanvasX allows you to arrange, align, and distribute objects such as notes and shapes. Use the properties and methods of <b>XRectNotes</b> and <b>XCircleNotes</b> to control their position, size, and alignment on the canvas.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li><b>top</b>, <b>left</b>: number — The position of the object on the canvas.</li>
          <li><b>originX</b>, <b>originY</b>: string — The reference point for positioning ('center', 'left', 'right', etc.).</li>
          <li><b>width</b>, <b>height</b>: number — The dimensions of the object.</li>
        </ul>
        <h3>Usage Example</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`const note = new XRectNotes('Aligned Note', {
  top: 100,
  left: 100,
  width: 150,
  height: 100,
  originX: 'center',
  originY: 'center',
});
canvas.add(note);`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Use consistent <b>originX</b> and <b>originY</b> for easier alignment.</li>
          <li>Distribute objects evenly for a clean layout.</li>
          <li>Combine alignment with connectors and shapes for structured diagrams.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
