//@ts-nocheck
'use client';
import {
  type XCanvas,
  XTextbox,
  XRectNotes,
  XConnector,
} from '@boardxus/canvasx-core';
import { NextPage } from 'next';
import { useRef, useCallback, useState } from 'react';
import { Canvas } from '../../components/Canvas';
import { type TMat2D, Circle } from 'fabric';
import { Box, Typography } from '@mui/joy';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);
  const [mouseInfo, setMouseInfo] = useState<string[]>([]);

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      const textValue = 'CanvasX Demo';
      // const connectDock1 = ['right', 'left', 'center'];
      // const connectDock2 = ['top', 'bottom', 'center'];
      // const connectBorder = ['left', 'right', 'top', 'bottom'];

      const style = 'curved';

      // var rect1 = new Rect({
      //     left: 50,
      //     top: 50,
      //     fill: 'red',
      //     width: 100,
      //     height: 100
      // });

      // var rect2 = new Rect({
      //     left: 200,
      //     top: 50,
      //     fill: 'green',
      //     width: 100,
      //     height: 100
      // });

      // var rect3 = new Rect({
      //     left: 350,
      //     top: 50,
      //     fill: 'blue',
      //     width: 100,
      //     height: 100
      // });

      // var rect4 = new Rect({
      //     left: 500,
      //     top: 50,
      //     fill: 'yellow',
      //     width: 100,
      //     height: 100
      // });

      // canvas.add(rect1, rect2, rect3, rect4);

      // // Create 10 RectNotes
      const rectNote1 = new XRectNotes(textValue, {
        originX: 'center',
        top: 100,
        left: 100,
        originY: 'center',
        connectors: [],
        textAlign: 'center',
        width: 138,
        backgroundColor: 'red',
        id: Math.random().toString(36).substr(2, 9),
      });
      canvas.add(rectNote1);

      const rectNote2 = new XRectNotes(textValue, {
        originX: 'center',
        top: 300,
        left: 300,
        originY: 'center',
        connectors: [],
        textAlign: 'center',
        width: 138,
        backgroundColor: 'lightblue',
        id: Math.random().toString(36).substr(2, 9),
      });
      canvas.add(rectNote2);

      const point1 = rectNote1.getPointByOrigin('right', 'center');
      const point2 = rectNote2.getPointByOrigin('left', 'center');
      console.log('points:', point1, point2);

      let cp1 = { x: 0, y: 0 },
        cp2 = { x: 0, y: 0 };

      cp1 = rectNote1.calculateControlPoint(point1);
      cp2 = rectNote2.calculateControlPoint(point2);
      const curve = new XConnector(point1, point2, cp1, cp2, style, {
        stroke: 'black',
        strokeWidth: 2,
        fill: '',
        objectCaching: false,
        hasBorders: false,
        hasControls: true,
        selectable: true,
        fromId: null,
        toId: null,
        perPixelTargetFind: true,
        id: Math.random().toString(36).substr(2, 9),
      });

      canvas.add(curve);

      //add connecter id to rectNote's field connectors as an object, {connectorId: string, point: {x: number, y: number}} the point shouldb be t he local point to the rectNote.
      rectNote1.connectors.push({
        connectorId: curve.id,
        point: { x: point1.x - rectNote1.left, y: point1.y - rectNote1.top },
      });
      rectNote2.connectors.push({
        connectorId: curve.id,
        point: { x: point2.x - rectNote2.left, y: point2.y - rectNote2.top },
      });
      //add rectNote's id to the connector's field connectedRectNotes as an array of string
      curve.fromId = rectNote1.id;
      curve.toId = rectNote2.id;

      //add measure for debugging
      const positions = [
        { left: 0, top: 0 },
        { left: 0, top: 100 },
        { left: 0, top: 200 },
        { left: 0, top: 300 },
        { left: 0, top: 400 },
        { left: 0, top: 500 },
        { left: 100, top: 0 },
        { left: 200, top: 0 },
        { left: 300, top: 0 },
        { left: 400, top: 0 },
        { left: 500, top: 0 },
      ];

      positions.forEach(({ left, top }) => {
        canvas.add(
          new Circle({
            radius: 5,
            fill: 'black',
            left,
            top,
            originX: 'center',
            originY: 'center',
            selectable: false,
            evented: false,
          }),
        );
      });

      canvas.add(
        new XTextbox(' (0,0)', {
          left: 0,
          top: 0,
          fontSize: 20,
          evented: false,
          selectable: false,
          width: 500,
        }),
      );

      // const line = new Line([x1 + 400, y1 + 400, x2 + 400, y2 + 400], {
      //     stroke: 'black',
      //     strokeWidth: 2,

      // });

      // canvas.add(line);
      canvas.renderAll();

      // Update the text object position and content based on mouse movement
      canvas.on('mouse:move', function (event) {
        const textMessage: string[] = [];
        const { viewportPoint, scenePoint } = event;
        textMessage.push('mouse point and viewport visualization');
        textMessage.push('-------------------------------------');

        // the current window viewport
        const viewportTransform = canvas.viewportTransform;

        textMessage.push('1. Dom Viewport(viewportPoint):');
        textMessage.push(
          `mouse: (${viewportPoint.x.toFixed(2)}, ${viewportPoint.y.toFixed(2)})`,
        );

        //add message to show the current mouse position on the canvas
        textMessage.push('2. Canvas Viewport(scenePoint):');
        textMessage.push(
          '- matrix:' + getViewportTransformRoundNumber(viewportTransform),
        );
        textMessage.push(
          `mouse: ${scenePoint.x.toFixed(2)}, ${scenePoint.y.toFixed(2)}`,
        );

        //add message to show the current mouse position on Active Object if any
        textMessage.push('3. Active Object:');
        if (canvas.getActiveObject()) {
          //@ts-ignore
          textMessage.push(
            '- matrix:' +
            getViewportTransformRoundNumber(
              canvas?.getActiveObject()?.calcTransformMatrix(),
            ),
          );
          const pointer = canvas.getPointer(event.e);
          //@ts-ignore
          const pointOnSelectedObject = canvas
            .getActiveObject()
            ?.transformPointFromCanvas(pointer);
          textMessage.push(
            `(${pointOnSelectedObject?.x.toFixed(2)}, ${pointOnSelectedObject?.y.toFixed(2)})`,
          );
        } else {
          textMessage.push('------');
        }

        // console.log('pointer:', pointer.x, pointer.y, 'to:', pointOnSelectedObject.toString())

        // const canvasWidth = canvas.width * canvas.getZoom();
        // const canvasHeight = canvas.height * canvas.getZoom();

        // text.set({
        //     left: canvasWidth - 10 - text.width, // Offset from the right edge of the canvas
        //     top: 10   // Offset from the top edge of the canvas
        // });

        setMouseInfo(textMessage);

        canvas.renderAll(); // Re-render the canvas
      });

      //create a function to get viewportTransform and all numbers are rounded to 2 decimal places
      function getViewportTransformRoundNumber(transform: TMat2D | null) {
        return transform?.map((value) => value.toFixed(2)).join(', ');
      }
      // // Create 10 CircleNotes
      // for (let i = 0; i < 10; i++) {
      //     const circleNote = new XCircleNotes(textValue, {
      //         originX: 'center',
      //         top: 520 + i * 10,
      //         left: 520 + i * 10,
      //         textAlign: 'center',
      //         textValue,
      //         backgroundColor: 'yellow',
      //         id: Math.random().toString(36).substr(2, 9),
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
      <div style={{ width: '100%', height: '80vh', margin: '0 auto', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fafbfc' }}>
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
        <h2>Viewport Demo Description</h2>
        <p>
          This page demonstrates viewport and zoom controls in CanvasX. You can use
          viewport widgets to manage the visible area, zoom in/out, and navigate
          large boards efficiently.
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
        <h2>Viewport Widget Documentation</h2>
        <h3>Overview</h3>
        <p>
          CanvasX provides viewport and zoom management features, allowing users
          to focus on specific areas, fit content to view, and navigate large
          diagrams or boards.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li>
            <b>zoom</b>: number — The current zoom level of the canvas.
          </li>
          <li>
            <b>viewportTransform</b>: array — The transformation matrix for the
            viewport.
          </li>
        </ul>
        <h3>Usage Example</h3>
        <pre
          style={{
            background: '#f6f8fa',
            padding: 12,
            borderRadius: 6,
          }}
        >{`canvas.setZoom(1.5);
canvas.zoomToPoint({ x: 200, y: 200 }, 2);
canvas.zoomToViewAllObjects();`}</pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>
            Use zoom controls to focus on details or get an overview of the board.
          </li>
          <li>
            Combine viewport management with navigation widgets for large
            diagrams.
          </li>
          <li>
            Reset zoom to fit all objects for presentations or exports.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
