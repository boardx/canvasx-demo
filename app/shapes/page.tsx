//@ts-nocheck
'use client';
import { type XCanvas, XShapeNotes } from '@boardxus/canvasx-core';
import { NextPage } from 'next';
import { useRef, useCallback, useState } from 'react';
import { Canvas } from '../../components/Canvas';

// import { RectNotes } from '../../../../src/shapes/RectNotes';
const shapeList = [
  {
    name: 'rect',
    path: 'M-50,-50L50,-50 50,50 -50,50z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'diamond',
    path: 'm-50,0 l50,-50 50,50 -50,50 -50,-50z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'roundedRect',
    path: 'M-50,-35 Q-50,-50 -35,-50 L35,-50 Q50,-50 50,-35 L50,35 Q50,50 35,50 L-35,50 Q-50,50 -50,35 Z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'circle',
    path: 'M-50,0a50,50 0 1,0 100,0a50,50 0 1,0 -100,0',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'hexagon',
    path: 'm-43.476 -25.4636 l 43.476 -24.5364 l 43.7551 25.2641 l 0 50.5157 l -43.7551 24.2202 l -43.7551 -25.2654 l 0 -50.5157 z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'triangle',
    path: 'm-50,50l50,-100l50,100l-100,0z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'parallelogramIcon',
    path: 'm-50,50l20,-100l80,0l-20,100l-80,0z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'star',
    path: 'm-50,-10l38,0l12,-38l12,38l38,0l-30,23l12,38l-30,-24l-30,24l12,-38l-30,-23z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'cross',
    path: 'm-50,-15l33,0l0,-33l34,0l0,33l33,0l0,34l-33,0l0,33l-34,0l0,-33l-33,0l0,-34z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'leftsideRightTriangle',
    path: 'm50,50l-100,0l0,-100l100,100z',
    offsetX: 100,
    offsetY: 100,
  },
  {
    name: 'rightsideRightTriangle',
    path: 'm-50,50l100,0l0,-100l-100,100z',
    offsetX: 200,
    offsetY: 200,
  },
  {
    name: 'topsideSemicircleCircle',
    path: 'm50,25l-100,-0.00205c3.5,-27.5 25,-48 50,-48c25,0 46.5,20.5 50,48z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'topLeftQuarterCircle',
    path: 'm-50,50c7,-55 47,-96 97,-97l0,65l0,32l-97,-0.00392z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'constellationRect',
    path: 'm20,0l25,23l0,24l-100,0l0,-100l100,0l0,23l-25,24l-0.15,0.14l0.15,0.14l-0.00001,0z',
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'constellationRound',
    path: 'm20,1c0.002,0.002 0.004,0.004 0.01,0.001c0.007,0.01 0.015,0.02 0.02,0.03l0,0l0.001,0.0004l0.005,0.003l0.04,0.03l0.3,0.2l2.5,2l20,15c-7,15 -23,26 -42,26c-25,0 -45,-20 -45,-45c0,-25 20,-45 45,-45c19,0 35,10 42,25c-11,9 -17,14 -20,16c-1.5,1 -2,1.5 -2.5,2c-0.2,0.15 -0.3,0.2 -0.35,0.3c-0.02,0.02 -0.04,0.04 -0.05,0.06c-0.006,0.01 -0.02,0.03 -0.03,0.06c-0.005,0.015 -0.02,0.04 -0.03,0.07c-0.005,0.015 -0.01,0.04 -0.007,0.07c0.002,0.02 0.007,0.04 0.015,0.06c0.003,0.006 0.006,0.012 0.009,0.018c0.003,0.004 0.006,0.009 0.009,0.014c0.003,0.005 0.009,0.01 0.01,0.015c0.004,0.005 0.01,0.015 0.012,0.017z',
    offsetX: 0,
    offsetY: 0,
  },
];

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);
  const [selected, setSelected] = useState<any>(null);
  const [property, setProperty] = useState({
    text: '',
    backgroundColor: '',
    width: 200,
    height: 200,
    textAlign: 'center',
    shapeName: '',
  });

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      const textValue = 'CanvasX Demo';

      for (let i = 0; i < shapeList.length; i++) {
        const shape = shapeList[i];
        const shapeNote = new XShapeNotes(textValue, {
          originX: 'center',
          originY: 'center',
          top: (i % 3) * 200 + 200,
          left: (i - (i % 3)) * 100 + 200,
          textAlign: 'center',
          width: 200,
          height: 200,
          shapeName: shape.name,
          backgroundColor: 'lightblue',
          id: Math.random().toString(36).substr(2, 9),
        });
        canvas.add(shapeNote);
      }
      // Selection logic for property editor
      canvas.on('selection:created', (opt: any) => {
        if (opt.selected && opt.selected[0]) {
          setSelected(opt.selected[0]);
          setProperty({
            text: opt.selected[0].text,
            backgroundColor: opt.selected[0].backgroundColor || '',
            width: opt.selected[0].width,
            height: opt.selected[0].height,
            textAlign: opt.selected[0].textAlign,
            shapeName: opt.selected[0].shapeName || '',
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
            height: opt.selected[0].height,
            textAlign: opt.selected[0].textAlign,
            shapeName: opt.selected[0].shapeName || '',
          });
        }
      });
      canvas.on('selection:cleared', () => {
        setSelected(null);
      });
    },
    [ref],
  );

  // Property editor
  const handlePropChange = (e: any) => {
    if (!selected) return;
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
    if (name === 'width' || name === 'height') {
      selected.set(name, parseInt(value));
    } else {
      selected.set(name, value);
    }
    selected.canvas && selected.canvas.requestRenderAll();
  };

  return (
    <div className="position-relative" style={{ minHeight: '80vh' }}>
      {/* Demo Section at the Top */}
      <div style={{ width: '100%', height: '80vh', margin: '0 auto', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fafbfc', position: 'relative' }}>
        <Canvas ref={ref} onLoad={onLoad} />
        {/* Property Editor Panel */}
        {selected && (
          <div style={{ position: 'absolute', right: 24, top: 80, background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #0001', minWidth: 220, zIndex: 10 }}>
            <h4 style={{ marginTop: 0 }}>Edit Shape Properties</h4>
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
              <input name="width" type="number" min={40} max={600} value={property.width} onChange={handlePropChange} style={{ width: 60 }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Height: </label>
              <input name="height" type="number" min={40} max={600} value={property.height} onChange={handlePropChange} style={{ width: 60 }} />
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
              <label>Shape: </label>
              <select name="shapeName" value={property.shapeName} onChange={handlePropChange}>
                {shapeList.map(shape => (
                  <option key={shape.name} value={shape.name}>{shape.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Description Section */}
      <div style={{ marginTop: 48, marginBottom: 16, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Shapes Demo Description</h2>
        <p>
          This page demonstrates the <b>XShapeNotes</b> component from <b>@boardxus/canvasx-core</b>. It displays a variety of shape types, including rectangles, diamonds, circles, hexagons, triangles, stars, and more. Each shape is rendered on the canvas and can be used as a building block for diagrams and visualizations.
        </p>
      </div>

      {/* Documentation Section */}
      <div style={{ marginBottom: 48, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>XShapeNotes Documentation</h2>
        <h3>Overview</h3>
        <p>
          The <b>XShapeNotes</b> widget allows you to add a wide range of geometric shapes to your CanvasX board. Each shape can be customized in size, color, and label, and supports drag, resize, and other interactions.
        </p>
        <h3>Properties</h3>
        <ul>
          <li><b>shapeName</b>: string — The name of the shape (e.g., 'rect', 'diamond', 'circle', 'hexagon', etc.).</li>
          <li><b>width</b>, <b>height</b>: number — The dimensions of the shape.</li>
          <li><b>backgroundColor</b>: string — The fill color of the shape.</li>
          <li><b>id</b>: string — Unique identifier for the shape.</li>
          <li><b>textAlign</b>: string — Alignment of the label text inside the shape.</li>
        </ul>
        <h3>Usage Example</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`const shape = new XShapeNotes('My Shape', {
  shapeName: 'star',
  width: 200,
  height: 200,
  backgroundColor: 'lightblue',
  id: 'star1',
  textAlign: 'center',
});
canvas.add(shape);`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Use <b>shapeName</b> to select from a variety of built-in shapes.</li>
          <li>Combine shapes with connectors to build flowcharts and diagrams.</li>
          <li>Customize <b>backgroundColor</b> and <b>textAlign</b> for better visual distinction.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
