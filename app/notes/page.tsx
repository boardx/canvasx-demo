'use client';
import { type XCanvas, XRectNotes, XCircleNotes } from '@boardxus/canvasx-core';
import { NextPage } from 'next';
import { useRef, useCallback, useState, useEffect } from 'react';
import { Canvas } from '../../components/Canvas';
import { Button } from '@mui/joy';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);
  const [hasNotes, setHasNotes] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [property, setProperty] = useState({
    text: '',
    backgroundColor: '',
    width: 138,
    height: 138,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Arial',
  });

  // Helpers for randomization
  function randomMeaningfulText() {
    const samples = [
      'Idea', 'Task', 'Note', 'Circle', 'Rect', 'Discuss', 'Todo', 'Review', 'Plan', 'Design',
    ];
    return samples[Math.floor(Math.random() * samples.length)];
  }
  function randomColor() {
    const colors = ['#FFD700', '#90EE90', '#ADD8E6', '#FFB6C1', '#FFA07A', '#E6E6FA', '#FFFACD', '#D3D3D3'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  function getRandomPosition() {
    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;
    const left = 100 + Math.random() * (width - 400);
    const top = 100 + Math.random() * (height - 300);
    return { left, top };
  }

  const onLoad = useCallback((canvas: XCanvas) => {
    canvas.setDimensions({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight - 60,
    });
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
          fontSize: opt.selected[0].fontSize || 18,
          fontFamily: opt.selected[0].fontFamily || 'Arial',
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
          fontSize: opt.selected[0].fontSize || 18,
          fontFamily: opt.selected[0].fontFamily || 'Arial',
        });
      }
    });
    canvas.on('selection:cleared', () => {
      setSelected(null);
    });
  }, [ref]);

  // Add a new Square Note (138x138)
  const addSquareNote = () => {
    const canvas = ref.current;
    const { left, top } = getRandomPosition();
    const note = new XRectNotes(randomMeaningfulText(), {
      originX: 'center',
      originY: 'center',
      top,
      left,
      width: 138,
      height: 138,
      textAlign: 'center',
      backgroundColor: randomColor(),
      id: Math.random().toString(36).substr(2, 9),
    });
    canvas?.add(note);
    setHasNotes(true);
  };
  // Add a new Rect Note (138x230)
  const addRectNote = () => {
    const canvas = ref.current;
    const { left, top } = getRandomPosition();
    const note = new XRectNotes(randomMeaningfulText(), {
      originX: 'center',
      originY: 'center',
      top,
      left,
      width: 230,
      height: 138,
      textAlign: 'center',
      backgroundColor: randomColor(),
      id: Math.random().toString(36).substr(2, 9),
    });
    canvas?.add(note);
    setHasNotes(true);
  };
  // Add a new Circle Note
  const addCircleNote = () => {
    const canvas = ref.current;
    const { left, top } = getRandomPosition();
    const note = new XCircleNotes(randomMeaningfulText(), {
      originX: 'center',
      originY: 'center',
      top,
      left,
      width: 138,
      height: 138,
      textAlign: 'center',
      backgroundColor: randomColor(),
      id: Math.random().toString(36).substr(2, 9),
    });
    canvas?.add(note);
    setHasNotes(true);
  };
  // Clear all notes
  const clearAll = () => {
    const canvas = ref.current;
    if (canvas) {
      const objs = canvas.getObjects();
      objs.forEach(obj => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      setHasNotes(false);
      setSelected(null);
    }
  };
  // Property editor
  const handlePropChange = (e: any) => {
    if (!selected) return;
    const { name, value } = e.target;
    // Always update property state with previous values, never clear text
    setProperty(prev => ({ ...prev, [name]: value }));
    if (name === 'width' || name === 'height' || name === 'fontSize') {
      selected.set(name, parseInt(value));
    } else {
      selected.set(name, value);
    }
    // After setting, ensure text is never overwritten to ''
    if (name !== 'text' && property.text !== undefined) {
      selected.set('text', property.text);
    }
    selected.canvas && selected.canvas.requestRenderAll();
  };

  // Add 10 default notes on mount (mix of 3 types)
  useEffect(() => {
    const canvas = ref.current;
    if (canvas && canvas.getObjects().length === 0) {
      for (let i = 0; i < 10; i++) {
        const { left, top } = getRandomPosition();
        let note;
        if (i % 3 === 0) {
          note = new XRectNotes(randomMeaningfulText(), {
            originX: 'center',
            originY: 'center',
            top,
            left,
            width: 138,
            height: 138,
            textAlign: 'center',
            backgroundColor: randomColor(),
            fontSize: 18,
            fontFamily: 'Arial',
            id: Math.random().toString(36).substr(2, 9),
          });
        } else if (i % 3 === 1) {
          note = new XRectNotes(randomMeaningfulText(), {
            originX: 'center',
            originY: 'center',
            top,
            left,
            width: 230,
            height: 138,
            textAlign: 'center',
            backgroundColor: randomColor(),
            fontSize: 18,
            fontFamily: 'Arial',
            id: Math.random().toString(36).substr(2, 9),
          });
        } else {
          note = new XCircleNotes(randomMeaningfulText(), {
            originX: 'center',
            originY: 'center',
            top,
            left,
            width: 138,
            height: 138,
            textAlign: 'center',
            backgroundColor: randomColor(),
            fontSize: 18,
            fontFamily: 'Arial',
            id: Math.random().toString(36).substr(2, 9),
          });
        }
        canvas.add(note);
      }
      setHasNotes(true);
    }
  }, []);

  return (
    <div className="position-relative" style={{ minHeight: '80vh' }}>
      <div style={{ width: '100%', height: '80vh', margin: '0 auto', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fafbfc', position: 'relative' }}>
        <Canvas ref={ref} onLoad={onLoad} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: 12, padding: 16, zIndex: 2 }}>
          <Button onClick={addSquareNote} variant="solid" color="primary">+ Add Square Note</Button>
          <Button onClick={addRectNote} variant="solid" color="primary">+ Add Rect Note</Button>
          <Button onClick={addCircleNote} variant="solid" color="success">+ Add Circle Note</Button>
          <Button onClick={clearAll} variant="outlined" color="danger">Clear All</Button>
        </div>
        {!hasNotes && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#aaa', fontSize: 22, pointerEvents: 'none' }}>
            No notes. Click "+ Add Rect Note" or "+ Add Circle Note" to create one.
          </div>
        )}
        {/* Property Editor Panel */}
        {selected && (
          <div style={{ position: 'absolute', right: 24, top: 80, background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #0001', minWidth: 220, zIndex: 10 }}>
            <h4 style={{ marginTop: 0 }}>Edit Note Properties</h4>
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
              <label>Font Size: </label>
              <input name="fontSize" type="number" min={8} max={72} value={property.fontSize} onChange={handlePropChange} style={{ width: 60 }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Font Family: </label>
              <select name="fontFamily" value={property.fontFamily} onChange={handlePropChange} style={{ width: '100%' }}>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Impact">Impact</option>
              </select>
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Align: </label>
              <select name="textAlign" value={property.textAlign} onChange={handlePropChange}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        )}
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
