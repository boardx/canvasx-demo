//@ts-nocheck
'use client';
import {
  XCanvas,
  XRectNotes,
  XCircleNotes,
  XTextbox,
  XConnector,
  XShapeNotes,
} from '@boardxus/canvasx-core';
import { type NextPage } from 'next';
import { useRef, useCallback, useState, useEffect } from 'react';
import { Canvas } from '../../components/Canvas';
import {
  Box,
  Button,
  Stack,
  Typography,
  Select,
  Option,
  Slider,
  Radio,
  RadioGroup,
} from '@mui/joy';

const ConnectorPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);
  const [pathType, setPathType] = useState<'curvePath' | 'straightPath'>('curvePath');
  const [arrowTip, setArrowTip] = useState<'none' | 'start' | 'end' | 'both'>('both');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [strokeColor, setStrokeColor] = useState('#4682B4');
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
  const [objectToConnect, setObjectToConnect] = useState<string | null>(null);
  const [connectMode, setConnectMode] = useState('manual'); // manual, automatic

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      const textValue = 'CanvasX Demo';
      const connectDock1 = ['right', 'left', 'center'];
      const connectDock2 = ['top', 'bottom', 'center'];
      const connectBorder = ['left', 'right', 'top', 'bottom'];

      const style = 'curved';
      for (let i = 0; i < connectBorder.length; i++) {
        for (let j = 0; j < connectBorder.length; j++) {
          // if (connectDock1[i] === 'center' && connectDock2[j] === 'center') continue;
          // if (connectDock1[i] !== 'center' && connectDock2[j] !== 'center') continue;
          const rectNoteA = new XRectNotes(textValue, {
            originX: 'center',
            top: 500 + i * 300,
            left: 700 + j * 900,
            textAlign: 'center',
            originY: 'center',
            connectors: [],
            backgroundColor: 'lightblue',
            id: Math.random().toString(36).substr(2, 9),
          });
          canvas.add(rectNoteA);

          const rectNoteB = new XRectNotes(textValue, {
            originX: 'center',
            top: 700 + i * 300,
            left: 1100 + j * 900,
            textAlign: 'center',
            originY: 'center',
            connectors: [],
            backgroundColor: 'lightblue',
            id: Math.random().toString(36).substr(2, 9),
          });
          canvas.add(rectNoteB);
          console.log('points combine: ', connectDock1[i], connectDock2[j]);

          let origin1A: any = connectDock1[i];
          let origin1B: any = connectDock2[j];
          let origin2A: any = connectDock1[j];
          let origin2B: any = connectDock2[j];

          if (connectBorder[i] === 'left' || connectBorder[i] === 'right') {
            origin1A = connectBorder[i];
            origin1B = 'center';
          } else {
            origin1A = 'center';
            origin1B = connectBorder[i];
          }
          if (connectBorder[j] === 'left' || connectBorder[j] === 'right') {
            origin2A = connectBorder[j];
            origin2B = 'center';
          } else {
            origin2A = 'center';
            origin2B = connectBorder[j];
          }

          const point1 = rectNoteA.getPointByOrigin(origin1A, origin1B);
          const point2 = rectNoteB.getPointByOrigin(origin2A, origin2B);
          console.log('points:', point1, point2);

          let cp1 = { x: 0, y: 0 },
            cp2 = { x: 0, y: 0 };

          cp1 = rectNoteA.calculateControlPoint(point1);
          cp2 = rectNoteB.calculateControlPoint(point2);

          const curve = new XConnector(point1, point2, cp1, cp2, {
            stroke: 'black',
            strokeWidth: 2,
            fill: '',
            objectCaching: false,
            hasBorders: false,
            hasControls: true,
            selectable: true,
            fromId: rectNoteA.id,
            toId: rectNoteB.id,
            fromObjectId: rectNoteA.id, // maintain fromObjectId
            toObjectId: rectNoteB.id,   // maintain toObjectId
            perPixelTargetFind: true,
            id: Math.random().toString(36).substr(2, 9),
          });

          canvas.add(curve);

          //add connecter id to rectNote's field connectors as an object, {connectorId: string, point: {x: number, y: number}, connectorType: 'from' | 'to'}
          rectNoteA.connectors.push({
            connectorId: curve.id,
            point: {
              x: point1.x - rectNoteA.left,
              y: point1.y - rectNoteA.top,
            },
            connectorType: 'from',
          });
          rectNoteB.connectors.push({
            connectorId: curve.id,
            point: {
              x: point2.x - rectNoteB.left,
              y: point2.y - rectNoteB.top,
            },
            connectorType: 'to',
          });
          //add rectNote's id to the connector's field connectedRectNotes as an array of string
          curve.fromId = rectNoteA.id;
          curve.toId = rectNoteB.id;
          curve.fromObjectId = rectNoteA.id; // ensure fromObjectId is set
          curve.toObjectId = rectNoteB.id;   // ensure toObjectId is set
        }
      }

      canvas.viewportTransform = [
        0.36303101943858546, 0, 0, 0.36303101943858546, -126.07004442771398,
        -105.08589083809863,
      ];

      // // // Create 10 RectNotes
      // const rectNote1 = new XRectNotes(textValue, {
      //     originX: 'center',
      //     top: 100,
      //     left: 100,
      //     originY: 'center',
      //     connectors: [],
      //     textAlign: 'center',
      //     width: 138,
      //     backgroundColor: 'red',
      //     id: Math.random().toString(36).substr(2, 9),
      // });
      // canvas.add(rectNote1);

      // const rectNote2 = new XRectNotes(textValue, {
      //     originX: 'center',
      //     top: 300,
      //     left: 300,
      //     originY: 'center',
      //     connectors: [],
      //     textAlign: 'center',
      //     width: 138,
      //     backgroundColor: 'lightblue',
      //     id: Math.random().toString(36).substr(2, 9),
      // });
      // canvas.add(rectNote2);

      // const point1 = rectNote1.getPointByOrigin('right', 'center');
      // const point2 = rectNote2.getPointByOrigin('left', 'center');
      // console.log('points:', point1, point2)

      // let cp1 = { x: 0, y: 0 }, cp2 = { x: 0, y: 0 };

      // cp1 = rectNote1.calculateControlPoint(rectNote1.getBoundingRect(), point1);
      // cp2 = rectNote2.calculateControlPoint(rectNote2.getBoundingRect(), point2);
      // const curve = new XConnector(point1, point2, cp1, cp2, style, {
      //     stroke: 'black',
      //     strokeWidth: 2,
      //     fill: '',
      //     objectCaching: false,
      //     hasBorders: false,
      //     hasControls: true,
      //     selectable: true,
      //     fromId: null,
      //     toId: null,
      //     perPixelTargetFind: true,
      //     id: Math.random().toString(36).substr(2, 9),
      // });

      // canvas.add(curve);

      // //add connecter id to rectNote's field connectors as an object, {connectorId: string, point: {x: number, y: number}} the point shouldb be t he local point to the rectNote.
      // rectNote1.connectors.push({ connectorId: curve.id, point: { x: point1.x - rectNote1.left, y: point1.y - rectNote1.top } });
      // rectNote2.connectors.push({ connectorId: curve.id, point: { x: point2.x - rectNote2.left, y: point2.y - rectNote2.top } });
      // //add rectNote's id to the connector's field connectedRectNotes as an array of string
      // curve.fromId = rectNote1.id;
      // curve.toId = rectNote2.id;

      // //add measure for debugging
      // const positions = [
      //     { left: 0, top: 0 },
      //     { left: 0, top: 100 },
      //     { left: 0, top: 200 },
      //     { left: 0, top: 300 },
      //     { left: 0, top: 400 },
      //     { left: 0, top: 500 },
      //     { left: 100, top: 0 },
      //     { left: 200, top: 0 },
      //     { left: 300, top: 0 },
      //     { left: 400, top: 0 },
      //     { left: 500, top: 0 },

      // ];

      // positions.forEach(({ left, top }) => {
      //     canvas.add(new Circle({
      //         radius: 5,
      //         fill: 'black',
      //         left,
      //         top,
      //         originX: 'center',
      //         originY: 'center',
      //         selectable: false,
      //         evented: false,
      //     }));
      // });

      // canvas.add(new XTextbox(' (0,0)', {
      //     left: 0,
      //     top: 0,
      //     fontSize: 20,
      //     evented: false,
      //     selectable: false,
      //     width: 500,
      // }));

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

        // setMouseInfo(textMessage);

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
      {/* <Typography level='body-md' style={{ backgroundColor: 'white', position: 'absolute', width: 500, right: 10, top: 10 }}>
                {mouseInfo.map((info) => (
                    <Box key={info}>
                        <p>{info}</p>
                    </Box>
                ))}
            </Typography> */}
    </div>
  );
};

export default ConnectorPage;
