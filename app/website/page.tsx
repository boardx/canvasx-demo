//@ts-nocheck
'use client';
import { } from 'fabric';
import { NextPage } from 'next';
import { useRef, useCallback } from 'react';
import { Canvas } from '../../components/Canvas';
import { XURL, type XCanvas } from '@boardxus/canvasx-core';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);

  const onLoad = useCallback(
    async (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      // const textValue = 'CanvasX Demo';

      const website = new XURL({
        top: 220,
        left: 200,
        fileName: 'EOS Worldwide',
        fileSrc: 'https://www.eosworldwide.com/',
        previewImage: {
          path: 'https://www.eosworldwide.com/wp-content/uploads/2023/01/eos-worldwide-logo.png',
          tmpPath:
            'https://files.boardx.us/beBT5B83vbXnsw7R5/ibQuarEwbKjEXL2pL/yBRJGAJKNN3TbKiW2/images/bigPic/5VSSmja6yynbsc3c.png',
        },

        id: Math.random().toString(36).substr(2, 9),
      });

      canvas.add(website);

      const website3 = new XURL({
        top: 220,
        left: 800,
        fileName: 'design thinking',
        fileSrc: 'https://www.boardx.us/dtdt-workshop-process/',
        previewImage: {
          path: 'https://www.boardx.us/wp-content/uploads/2023/01/dtdt-workshop-process.png',
          tmpPath:
            'https://files.boardx.us/beBT5B83vbXnsw7R5/ibQuarEwbKjEXL2pL/yBRJGAJKNN3TbKiW2/images/bigPic/5VSSmja6yynbsc3c.png',
        },

        id: Math.random().toString(36).substr(2, 9),
      });

      canvas.add(website3);

      const website2 = new XURL({
        top: 220,
        left: 500,
        fileName: 'no preview image',
        fileSrc: 'https://www.boardx.us',
        previewImage: {
          path: 'https://www.boardx.us/wp-content/uploads/2023/01/dtdt-workshop-process.png',
          tmpPath:
            'https://files.boardx.us/beBT5B83vbXnsw7R5/ibQuarEwbKjEXL2pL/yBRJGAJKNN3TbKiW2/images/bigPic/5VSSmja6yynbsc3c.png',
        },

        id: Math.random().toString(36).substr(2, 9),
      });

      canvas.add(website2);

      canvas.renderAll();
      // // Create 10 RectNotes
      // for (let i = 0; i < 5; i++) {
      //     const rectNote = new XShapeNotes(textValue, {
      //         originX: 'center',
      //         top: 220,
      //         left: 200 + i * 250,
      //         textAlign: 'center',
      //         width: 200,
      //         height: 200,
      //         icon: i,
      //         textValue,
      //         backgroundColor: 'lightblue',
      //         id: Math.random().toString(36).substr(2, 9),
      //     });
      //     canvas.add(rectNote);
      // }

      // // Create 10 RectNotes
      // for (let i = 6; i < 11; i++) {
      //     const rectNote = new XShapeNotes(textValue, {
      //         originX: 'center',
      //         top: 220 + 300,
      //         left: 200 + (i - 6) * 250,
      //         textAlign: 'center',
      //         width: 200,
      //         height: 200,
      //         icon: i,
      //         textValue,
      //         backgroundColor: 'lightblue',
      //         id: Math.random().toString(36).substr(2, 9),
      //     });
      //     canvas.add(rectNote);
      // }

      // // Create 10 CircleNotes
      // for (let i = 0; i < 10; i++) {
      //     const circleNote = new XCircleNotes(textValue, {
      //         originX: 'center',
      //         top: 520 + i * 10,
      //         left: 520 + i * 10,
      //         textAlign: 'center',
      //         textValue,
      //         backgroundColor: 'yellow',
      //     });
      //     canvas.add(circleNote);
      // }

      // // Create 10 more RectNotes with different dimensions
      // for (let i = 0; i < 10; i++) {
      //     const rectNote = new XRectNotes(textValue, {
      //         originX: 'center',
      //         top: 200 + i * 10,
      //         left: 600 + i * 10,
      //         width: 138,
      //         height: 138,
      //         textAlign: 'center',
      //         textValue,
      //         backgroundColor: 'green',
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
        <h2>Website Demo Description</h2>
        <p>
          This page demonstrates embedding and interacting with web content inside CanvasX. You can use this feature to display live websites, dashboards, or external resources directly on your canvas for reference or collaboration.
        </p>
      </div>

      {/* Documentation Section */}
      <div style={{ marginBottom: 48, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Website Embedding Documentation</h2>
        <h3>Overview</h3>
        <p>
          CanvasX supports embedding websites and web apps as interactive frames. This is useful for referencing external content, integrating dashboards, or collaborating with live web resources.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li><b>src</b>: string — The URL of the website to embed.</li>
          <li><b>width</b>, <b>height</b>: number — The dimensions of the embedded frame.</li>
          <li><b>top</b>, <b>left</b>: number — The position of the frame on the canvas.</li>
        </ul>
        <h3>Usage Example</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`const website = new XWebsite('https://example.com', {
  top: 100,
  left: 100,
  width: 800,
  height: 600,
});
canvas.add(website);`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Ensure the embedded website allows being loaded in an iframe (CORS and X-Frame-Options).</li>
          <li>Use website widgets for dashboards, documentation, or collaborative tools.</li>
          <li>Resize and position the frame for optimal viewing.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
