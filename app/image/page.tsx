//@ts-nocheck
'use client';
import { type XCanvas, XImage } from '@boardxus/canvasx-core';
import { NextPage } from 'next';
import { useRef, useCallback } from 'react';
import { Canvas } from '../../components/Canvas';

// import { XImage } from '../../../../../src/shapes/canvasx/XImage';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);

  const onLoad = useCallback(
    async (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      // const textValue = 'CanvasX Demo';

      const image = new XImage('elementId', {
        top: 220,
        left: 200,
        width: 150,
        height: 150,
      });

      await image.setSrc(
        'https://th.bing.com/th/id/OIP.WEKMZBVS3dCZ3PT9NU9UKAAAAA?rs=1&pid=ImgDetMain',
      );

      canvas.add(image);

      const image2 = new XImage('elementId', {
        top: 220,
        left: 600,
        width: 150,
        height: 150,
      });

      await image2.setSrc(
        ' https://knowledge.wharton.upenn.edu/wp-content/uploads/2023/03/3.15.23-scott-snyder-esg-corporate-innovation-GettyImages-1410816388-900x605.png',
      );

      canvas.add(image2);

      canvas.renderAll();
      // // Create 10 RectNotes
      // for (let i = 0; i < 10; i++) {
      //     const rectNote = new RectNotes(textValue, {
      //         originX: 'center',
      //         top: 220 + i * 20,
      //         left: 200 + i * 20,
      //         textAlign: 'center',
      //         backgroundColor: 'lightblue',
      //         id: Math.random().toString(36).substr(2, 9),
      //     });
      //     canvas.add(rectNote);
      // }

      // // Create 10 CircleNotes
      // for (let i = 0; i < 10; i++) {
      //     const circleNote = new CircleNotes(textValue, {
      //         originX: 'center',
      //         top: 520 + i * 10,
      //         left: 520 + i * 10,
      //         textAlign: 'center',

      //         backgroundColor: 'yellow',
      //         id: Math.random().toString(36).substr(2, 9),
      //     });
      //     canvas.add(circleNote);
      // }

      // // Create 10 more RectNotes with different dimensions
      // for (let i = 0; i < 10; i++) {
      //     const rectNote = new RectNotes(textValue, {
      //         originX: 'center',
      //         top: 200 + i * 10,
      //         left: 600 + i * 10,
      //         width: 138,
      //         height: 138,
      //         textAlign: 'center',

      //         backgroundColor: 'lightgreen',
      //         id: Math.random().toString(36).substr(2, 9),
      //     });
      //     canvas.add(rectNote);
      // }
    },
    [ref],
  );

  return (
    <div className="position-relative" style={{ minHeight: '80vh' }}>
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
        <h2>Image Demo Description</h2>
        <p>
          This page demonstrates the <b>XImage</b> component from <b>@boardxus/canvasx-core</b>. It shows how to add and display images on the canvas, set their source, and control their size and position.
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
        <h2>XImage Documentation</h2>
        <h3>Overview</h3>
        <p>
          The <b>XImage</b> widget allows you to add images to your CanvasX board. Images can be loaded from URLs, positioned, resized, and combined with other objects for rich visual layouts.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li><b>src</b>: string — The image source URL.</li>
          <li><b>width</b>, <b>height</b>: number — The dimensions of the image.</li>
          <li><b>top</b>, <b>left</b>: number — The position of the image on the canvas.</li>
          <li><b>id</b>: string — Unique identifier for the image.</li>
        </ul>
        <h3>Usage Example</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`const image = new XImage('elementId', {
  top: 100,
  left: 100,
  width: 200,
  height: 200,
});
await image.setSrc('https://example.com/image.png');
canvas.add(image);`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Use high-resolution images for better clarity on high-DPI screens.</li>
          <li>Combine images with notes, shapes, and connectors for diagrams and presentations.</li>
          <li>Set unique IDs for each image to manage them programmatically.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
