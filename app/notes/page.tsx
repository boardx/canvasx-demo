//@ts-nocheck
'use client';
import { type XCanvas, XRectNotes, XCircleNotes } from '@boardxus/canvasx-core';
import { NextPage } from 'next';
import { useRef, useCallback } from 'react';
import { Canvas } from '../../components/Canvas';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      const textValue = 'CanvasX Demo';

      // Create 10 RectNotes
      for (let i = 0; i < 10; i++) {
        const rectNote = new XRectNotes(textValue, {
          originX: 'center',
          originY: 'center',
          top: 220 + i * 20,
          left: 200 + i * 20,
          textAlign: 'center',
          backgroundColor: 'lightblue',
          id: Math.random().toString(36).substr(2, 9),
        });
        canvas.add(rectNote);
      }

      // Create 10 CircleNotes
      for (let i = 0; i < 10; i++) {
        const circleNote = new XRectNotes(textValue, {
          originX: 'center',
          originY: 'center',
          top: 520 + i * 10,
          left: 520 + i * 10,
          textAlign: 'center',

          backgroundColor: 'yellow',
          id: Math.random().toString(36).substr(2, 9),
        });
        canvas.add(circleNote);
      }

      // Create 10 more RectNotes with different dimensions
      for (let i = 0; i < 10; i++) {
        const rectNote = new XCircleNotes(textValue, {
          originX: 'center',
          originY: 'center',
          top: 200 + i * 10,
          left: 600 + i * 10,
          width: 138,
          height: 138,
          textAlign: 'center',

          backgroundColor: 'lightgreen',
          id: Math.random().toString(36).substr(2, 9),
        });
        canvas.add(rectNote);
      }
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
        <h2>Notes Demo Description</h2>
        <p>
          This page demonstrates the <b>XRectNotes</b> and <b>XCircleNotes</b> components from <b>@boardxus/canvasx-core</b>. It shows how to add rectangular and circular notes to the canvas, each with customizable color and label. These notes can be used for brainstorming, diagramming, and visual organization.
        </p>
      </div>

      {/* Documentation Section */}
      <div style={{ marginBottom: 48, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Notes Widgets Documentation</h2>
        <h3>Overview</h3>
        <p>
          <b>XRectNotes</b> and <b>XCircleNotes</b> are widgets for adding sticky notes and circular notes to your CanvasX board. They support drag, resize, color customization, and text editing.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li><b>backgroundColor</b>: string — The fill color of the note.</li>
          <li><b>width</b>, <b>height</b>: number — The dimensions of the note.</li>
          <li><b>id</b>: string — Unique identifier for the note.</li>
          <li><b>textAlign</b>: string — Alignment of the label text inside the note.</li>
        </ul>
        <h3>Usage Example</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`const note = new XRectNotes('My Note', {
  width: 200,
  height: 100,
  backgroundColor: 'lightblue',
  textAlign: 'center',
  id: 'note1',
});
canvas.add(note);

const circle = new XCircleNotes('Circle Note', {
  width: 120,
  height: 120,
  backgroundColor: 'yellow',
  id: 'circle1',
});
canvas.add(circle);`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Use different colors to categorize notes visually.</li>
          <li>Combine notes with connectors and shapes for diagrams and mind maps.</li>
          <li>Resize notes to fit more or less content as needed.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
