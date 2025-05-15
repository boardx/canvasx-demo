//@ts-nocheck
'use client';
import { XCanvas, XTextbox } from '@boardxus/canvasx-core';
import { IText } from 'fabric';
import { NextPage } from 'next';
import { useRef, useCallback } from 'react';
import { Canvas } from '../../components/Canvas';
import { Button } from '@mui/joy';

// import { RectNotes } from '../../../../src/shapes/RectNotes';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      const textValue = 'CanvasX DemoCanvasX DemoCanvasX DemoCanvasX Demo';

      // Create 10 RectNotes
      for (let i = 0; i < 1; i++) {
        const rectNote = new XTextbox(textValue, {
          originX: 'center',
          originY: 'center',
          top: 220 + i * 60,
          left: 500 + i * 20,
          width: 500,
          textAlign: 'center',
          evented: true,
          backgroundColor: 'lightblue',
          editable: true,
          cornerStrokeColor: 'gray',
          cornerStyle: 'circle',
          cornerColor: 'white',
          transparentCorners: false,
          id: Math.random().toString(36).substr(2, 9),
        });
        canvas.add(rectNote);
      }
    },
    [ref],
  );

  const createNew = () => {
    const canvas = ref.current;
    const textValue = 'abc';
    const rectNote = new IText(textValue, {
      originX: 'center',
      originY: 'center',
      top: 220,
      left: 200,
      width: 500,
      textAlign: 'center',
      evented: true,
      backgroundColor: 'lightblue',
      editable: true,
      cornerStrokeColor: 'gray',
      cornerStyle: 'circle',
      cornerColor: 'white',
      transparentCorners: false,
      id: Math.random().toString(36).substr(2, 9),
    });
    canvas?.add(rectNote);
  };
  return (
    <div className="position-relative" style={{ minHeight: '70vh' }}>
      <h1 style={{ textAlign: 'center', marginTop: 16 }}>Text Demo</h1>
      <div style={{ width: '100%', height: '70vh', margin: '0 auto', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fafbfc' }}>
        <Canvas ref={ref} onLoad={onLoad} />
        <Button
          onClick={createNew}
          variant="solid"
          sx={{ position: 'absolute', left: '10px', top: '20px' }}
        >
          {' '}
          Create
        </Button>
      </div>

      {/* Description Section */}
      <div style={{ marginTop: 48, marginBottom: 16, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Text Demo Description</h2>
        <p>
          This page demonstrates the <b>XTextbox</b> and <b>IText</b> components from <b>@boardxus/canvasx-core</b> and Fabric.js. You can add and edit text objects on the canvas. Use the "Create" button to add a new editable text box.
        </p>
      </div>

      {/* Documentation Section */}
      <div style={{ marginBottom: 48, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Text Objects Documentation</h2>
        <h3>Overview</h3>
        <p>
          CanvasX supports rich text editing using <b>XTextbox</b> and <b>IText</b> objects. These allow users to add, edit, and style text directly on the canvas, supporting features like multi-line editing, alignment, and background color.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li><b>text</b>: string — The text content.</li>
          <li><b>width</b>: number — The width of the text box.</li>
          <li><b>textAlign</b>: string — Alignment of the text ('left', 'center', 'right').</li>
          <li><b>backgroundColor</b>: string — Background color of the text box.</li>
          <li><b>editable</b>: boolean — Whether the text is editable on the canvas.</li>
        </ul>
        <h3>Usage Example</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`const text = new XTextbox('Hello World', {
  width: 400,
  textAlign: 'center',
  backgroundColor: 'lightblue',
  editable: true,
});
canvas.add(text);`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Use <b>XTextbox</b> for multi-line and styled text.</li>
          <li>Use <b>IText</b> for inline text editing with Fabric.js features.</li>
          <li>Set <b>editable</b> to false to lock text objects.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
