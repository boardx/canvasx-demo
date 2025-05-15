//@ts-nocheck
'use client';
import { type XCanvas, XRectNotes } from '@boardxus/canvasx-core';
import { PencilBrush } from 'fabric';
import { NextPage } from 'next';
import { useRef, useCallback, useState } from 'react';
import { Canvas } from '../../components/Canvas';

// SVG data URL
const penCursor =
  'data:image/svg+xml;base64,' +
  btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="purple" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
`);

// Helper to generate SVG pen cursor with dynamic color
function getPenCursor(color: string) {
  return (
    'data:image/svg+xml;base64,' +
    btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>`)
  );
}

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);

  // Track brush color in state for cursor updates
  const [brushColor, setBrushColor] = useState('#800080');

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });

      canvas.freeDrawingBrush = new PencilBrush(canvas);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 3;
      canvas.freeDrawingBrush.color = brushColor;
      canvas.freeDrawingCursor = `url(${getPenCursor(brushColor)}) 0 24, auto`;

      const textValue = 'CanvasX Demo Drawing';
      canvas.add(
        new XRectNotes(textValue, {
          originX: 'center',
          top: 220,
          left: 200,
          textAlign: 'center',
          backgroundColor: 'lightblue',
          id: Math.random().toString(36).substr(2, 9),
        }),
      );
    },
    [ref, brushColor],
  );

  return (
    <div className="position-relative" style={{ minHeight: '80vh' }}>
      {/* Drawing Controls Menu */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 10,
          background: '#fff',
          border: '1px solid #eee',
          borderRadius: 8,
          padding: 16,
          boxShadow: '0 2px 8px #0001',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14 }}>Color:</span>
          <input
            type="color"
            value={brushColor}
            onChange={e => {
              setBrushColor(e.target.value);
              if (ref.current) {
                ref.current.freeDrawingBrush.color = e.target.value;
                ref.current.freeDrawingCursor = `url(${getPenCursor(e.target.value)}) 0 24, auto`;
              }
            }}
            style={{ width: 32, height: 32, border: 'none', background: 'none' }}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14 }}>Width:</span>
          <input
            type="range"
            min={1}
            max={20}
            defaultValue={3}
            onChange={(e) => {
              if (ref.current) ref.current.freeDrawingBrush.width = parseInt(e.target.value);
            }}
            style={{ width: 80 }}
          />
        </label>
      </div>
      <div
        style={{
          width: '100%',
          height: '75vh',
          margin: '0 auto',
          border: '1px solid #eee',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#fafbfc',
        }}
      >
        <Canvas ref={ref} onLoad={onLoad} />
      </div>

      {/* Description Section */}
      <div
        style={{
          marginTop: 48,
          marginBottom: 16,
          padding: 16,
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h2>Drawing Demo Description</h2>
        <p>
          This page demonstrates the free drawing mode in <b>CanvasX</b> using the{' '}
          <b>PencilBrush</b> from Fabric.js. You can draw directly on the canvas
          with a custom pen cursor. A sample note is also added for reference.
        </p>
      </div>

      {/* Documentation Section */}
      <div
        style={{
          marginBottom: 48,
          padding: 16,
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h2>Drawing Mode Documentation</h2>
        <h3>Overview</h3>
        <p>
          CanvasX supports free drawing using Fabric.js brushes. The{' '}
          <b>PencilBrush</b> allows users to draw smooth, hand-drawn lines on the
          canvas. You can customize the brush width, color, and cursor.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li>
            <b>isDrawingMode</b>: boolean — Enables or disables drawing mode on
            the canvas.
          </li>
          <li>
            <b>freeDrawingBrush</b>: Brush — The brush used for drawing (e.g.,
            PencilBrush, CircleBrush).
          </li>
          <li>
            <b>freeDrawingBrush.width</b>: number — The width of the drawing
            brush.
          </li>
          <li>
            <b>freeDrawingBrush.color</b>: string — The color of the drawing
            brush.
          </li>
        </ul>
        <h3>Usage Example</h3>
        <pre
          style={{
            background: '#f6f8fa',
            padding: 12,
            borderRadius: 6,
          }}
        >
          {`canvas.freeDrawingBrush = new PencilBrush(canvas);
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = 3;
canvas.freeDrawingBrush.color = 'purple';`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Use a custom cursor for better drawing experience.</li>
          <li>
            Combine drawing with shapes and notes for richer diagrams.
          </li>
          <li>
            Disable drawing mode when not needed to allow object selection.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
