//@ts-nocheck
'use client';
import { XCanvas, XTextbox } from '@boardxus/canvasx-core';
import { IText } from 'fabric';
import { NextPage } from 'next';
import { useRef, useCallback, useState } from 'react';
import { Canvas } from '../../components/Canvas';
import { Button } from '@mui/joy';

// import { RectNotes } from '../../../../src/shapes/RectNotes';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);
  const [hasText, setHasText] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [property, setProperty] = useState({
    text: '',
    backgroundColor: '',
    width: 400,
    textAlign: 'center',
    editable: true,
    fontFamily: 'Arial',
    fontSize: 24,
  });

  // Helper to generate random string
  function randomString(len = 6) {
    return Math.random().toString(36).substr(2, len);
  }

  // Helper to generate random meaningful text
  function randomMeaningfulText() {
    const samples = [
      'Hello CanvasX!',
      'Edit me!',
      'Drag to move',
      'Resizable text',
      'Double-click to edit',
      'Try changing my color',
      'CanvasX is awesome',
      'Type your note here',
      'Fabric.js power',
      'Customizable text box',
    ];
    return samples[Math.floor(Math.random() * samples.length)];
  }

  // Helper to get random position within visible canvas
  function getRandomPosition() {
    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;
    // Padding to avoid out-of-bounds
    const left = 100 + Math.random() * (width - 600);
    const top = 100 + Math.random() * (height - 400);
    return { left, top };
  }

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      const textValue = 'CanvasX DemoCanvasX DemoCanvasX DemoCanvasX Demo';
      // Create initial RectNote
      const rectNote = new XTextbox(textValue, {
        originX: 'center',
        originY: 'center',
        top: 220,
        left: 500,
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
      setHasText(true);
      // Focus and select on click
      canvas.on('selection:created', (opt: any) => {
        if (opt.selected && opt.selected[0]) {
          setSelected(opt.selected[0]);
          setProperty({
            text: opt.selected[0].text,
            backgroundColor: opt.selected[0].backgroundColor || '',
            width: opt.selected[0].width,
            textAlign: opt.selected[0].textAlign,
            editable: opt.selected[0].editable,
            fontFamily: opt.selected[0].fontFamily || 'Arial',
            fontSize: opt.selected[0].fontSize || 24,
          });
        }
      });
      canvas.on('selection:updated', (opt: any) => {
        if (opt.selected && opt.selected[0]) {
          setSelected(opt.selected[0]);
          setProperty({
            text: opt.selected[0].text,
            backgroundColor: opt.selected[0].backgroundColor || '',
            width: opt.selected[0].width,
            textAlign: opt.selected[0].textAlign,
            editable: opt.selected[0].editable,
            fontFamily: opt.selected[0].fontFamily || 'Arial',
            fontSize: opt.selected[0].fontSize || 24,
          });
        }
      });
      canvas.on('selection:cleared', () => {
        setSelected(null);
      });
    },
    [ref],
  );

  // Create a new XTextbox on canvas with random text
  const createNew = () => {
    const canvas = ref.current;
    const textValue = randomMeaningfulText();
    const { left, top } = getRandomPosition();
    const rectNote = new XTextbox(textValue, {
      originX: 'center',
      originY: 'center',
      top,
      left,
      width: 400,
      textAlign: 'center',
      evented: true,
      backgroundColor: '#e3f2fd',
      editable: true,
      cornerStrokeColor: 'gray',
      cornerStyle: 'circle',
      cornerColor: 'white',
      transparentCorners: false,
      id: Math.random().toString(36).substr(2, 9),
    });
    canvas?.add(rectNote);
    setHasText(true);
  };

  // Clear all text objects from canvas (fix: use discardActiveObject and renderAll)
  const clearAll = () => {
    const canvas = ref.current;
    if (canvas) {
      const objs = canvas.getObjects();
      objs.forEach(obj => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      setHasText(false);
      setSelected(null);
    }
  };

  // Handle property change for selected text object
  const handlePropChange = (e: any) => {
    if (!selected) return;
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    setProperty(prev => ({ ...prev, [name]: newValue }));
    // Update the selected object on canvas
    if (name === 'width') {
      selected.set('width', parseInt(newValue));
    } else if (name === 'editable') {
      selected.set('editable', newValue);
    } else if (name === 'fontSize') {
      selected.set('fontSize', parseInt(newValue));
    } else {
      selected.set(name, newValue);
    }
    selected.canvas && selected.canvas.requestRenderAll();
  };

  return (
    <div className="position-relative" style={{ minHeight: '70vh' }}>
      <h1 style={{ textAlign: 'center', marginTop: 16 }}>Text Demo</h1>
      <div style={{ width: '100%', height: '70vh', margin: '0 auto', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fafbfc', position: 'relative' }}>
        <Canvas ref={ref} onLoad={onLoad} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: 12, padding: 16 }}>
          <Button onClick={createNew} variant="solid" color="primary">
            + Add Text
          </Button>
          <Button onClick={clearAll} variant="outlined" color="danger">
            Clear All
          </Button>
        </div>
        {!hasText && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#aaa', fontSize: 22, pointerEvents: 'none' }}>
            No text objects. Click "+ Add Text" to create one.
          </div>
        )}
        {/* Property Editor Panel */}
        {selected && (
          <div style={{ position: 'absolute', right: 24, top: 80, background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #0001', minWidth: 220, zIndex: 10 }}>
            <h4 style={{ marginTop: 0 }}>Edit Text Properties</h4>
            <div style={{ marginBottom: 8 }}>
              <label>Text: </label>
              <input name="text" value={property.text} onChange={handlePropChange} style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Background: </label>
              <input name="backgroundColor" value={property.backgroundColor} onChange={handlePropChange} type="color" style={{ width: 40, height: 24, padding: 0, border: 'none' }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Width: </label>
              <input name="width" type="number" min={50} max={1000} value={property.width} onChange={handlePropChange} style={{ width: 60 }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Font Family: </label>
              <select name="fontFamily" value={property.fontFamily} onChange={handlePropChange}>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Impact">Impact</option>
              </select>
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Font Size: </label>
              <input name="fontSize" type="number" min={8} max={120} value={property.fontSize} onChange={handlePropChange} style={{ width: 60 }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Align: </label>
              <select name="textAlign" value={property.textAlign} onChange={handlePropChange}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Editable: </label>
              <input name="editable" type="checkbox" checked={property.editable} onChange={handlePropChange} />
            </div>
          </div>
        )}
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
