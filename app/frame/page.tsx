//@ts-nocheck
'use client';
import { type XCanvas} from '@boardxus/canvasx-core';
import { Rect } from 'fabric'
import { NextPage } from 'next';
import { useRef, useCallback } from 'react';
import { Canvas } from '../../components/Canvas';

import { XFrame } from '@boardxus/canvasx-core';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });

      const frame = new XFrame(canvas, 'Frame Title', 100, 100, 400, 300);
      frame.canvas = canvas; // Assign the canvas to the frame instance

      const slide = new Rect({
        left: 150,
        top: 150,
        width: 200,
        height: 150,
        fill: 'white',
        stroke: 'black',
      });

      canvas.add(slide);

      canvas.zoomToViewAllObjects();
    },
    [ref],
  );

  return (
    <div className="position-relative">
      <Canvas ref={ref} onLoad={onLoad} />
    </div>
  );
};

export default IndexPage;
