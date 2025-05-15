import { XCanvas } from '@boardxus/canvasx-core';
import React, { useEffect, useRef, useState } from 'react';

const DEV_MODE = process.env.NODE_ENV === 'development';

export const Canvas: any = React.forwardRef<
  XCanvas,
  { onLoad?(canvas: XCanvas): void }
>(({ onLoad }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState(null as XCanvas | null);

  useEffect(() => {
    if (!canvasRef.current || canvas || typeof window === 'undefined') {
      return;
    }

    const canvasInstance = new XCanvas(canvasRef.current, {
      backgroundColor: '#f0f0f0',
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth - 60,
    });
    canvasInstance.setTargetFindTolerance(5);

    setCanvas(canvasInstance); // Update the type of the setCanvas argument
    // EventService.getInstance().listenCanvasDomEvents();

    // const alignmentGuidelines = new alignmentGuideLines(canvasInstance);
    // alignmentGuidelines.initializeEvents();
    // initializeCanvasEvents(canvasInstance);
    const handleResize = () => {
      canvasInstance.setHeight(document.documentElement.clientHeight - 60);
      canvasInstance.setWidth(document.documentElement.clientWidth);
      canvasInstance.renderAll();
    };

    const lastTimeRefireMouseDown = Date.now();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.documentElement);

    //@ts-ignore
    DEV_MODE && (window.canvas = canvasInstance);

    if (typeof ref === 'function') {
      ref(canvasInstance);
    } else if (typeof ref === 'object' && ref) {
      ref.current = canvasInstance;
    }

    canvasInstance.on('object:modified', (e) => {
      setCoords();
    });

    //loop through all objects and setCoords()
    function setCoords() {
      canvasInstance.getObjects().forEach(function (obj) {
        obj.setCoords();
      });
    }

    // Enable zoom in/out for trackpad and mouse wheel
    const handleWheel = (e: WheelEvent) => {
      // Only zoom if Ctrl, Meta, or Alt is pressed (for trackpad/mouse zoom)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault();
        const delta = e.deltaY || e.detail;
        let zoom = canvasInstance.getZoom();
        zoom *= 0.999 ** delta;
        zoom = Math.max(0.1, Math.min(zoom, 10));
        const pointer = canvasInstance.getPointer(e);
        canvasInstance.zoomToPoint(pointer, zoom);
      }
    };

    // --- Trackpad pinch-to-zoom support for MacBook (gesture events) ---
    let lastGestureScale = 1;
    const handleGestureChange = (e: any) => {
      e.preventDefault();
      const scaleDelta = e.scale - lastGestureScale;
      // Simulate a wheel event with ctrlKey: true
      const fakeWheelEvent = {
        ctrlKey: true,
        deltaY: -scaleDelta * 100, // scale to wheel delta
        preventDefault: () => { },
        clientX: e.clientX || (canvasRef.current?.width || 0) / 2,
        clientY: e.clientY || (canvasRef.current?.height || 0) / 2,
        target: canvasRef.current,
      };
      handleWheel(fakeWheelEvent as any);
      lastGestureScale = e.scale;
    };
    const handleGestureStart = (e: any) => {
      lastGestureScale = e.scale;
    };
    const handleGestureEnd = (e: any) => {
      lastGestureScale = 1;
    };

    const canvasEl = canvasRef.current;
    if (canvasEl) {
      canvasEl.addEventListener('wheel', handleWheel, { passive: false });
      canvasEl.addEventListener('gesturestart', handleGestureStart, { passive: false });
      canvasEl.addEventListener('gesturechange', handleGestureChange, { passive: false });
      canvasEl.addEventListener('gestureend', handleGestureEnd, { passive: false });
    }

    // it is crucial `onLoad` is a dependency of this effect
    // to ensure the canvas is disposed and re-created if it changes
    onLoad?.(canvasInstance);

    return () => {
      resizeObserver.unobserve(document.documentElement);
      resizeObserver.disconnect();
      //@ts-ignore
      DEV_MODE && delete window.canvas;

      if (typeof ref === 'function') {
        ref(null);
      } else if (typeof ref === 'object' && ref) {
        ref.current = null;
      }

      // `dispose` is async
      // however it runs a sync DOM cleanup
      // its async part ensures rendering has completed
      // and should not affect react
      canvasInstance.dispose();

      if (canvasEl) {
        canvasEl.removeEventListener('wheel', handleWheel);
        canvasEl.removeEventListener('gesturestart', handleGestureStart);
        canvasEl.removeEventListener('gesturechange', handleGestureChange);
        canvasEl.removeEventListener('gestureend', handleGestureEnd);
      }
    };
  }, []);

  return (
    <>
      <canvas tabIndex={0} ref={canvasRef} />
    </>
  );
});
