//@ts-nocheck
'use client';
import { XCanvas, XTextbox, XImageCropper } from '@boardxus/canvasx-core';
import { type NextPage } from 'next';
import { useRef, useCallback, useState } from 'react';
import { Canvas } from '../../components/Canvas';
import { Box, Button, ButtonGroup, Stack, Typography, Divider } from '@mui/joy';

const CropDemoPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);
  const [currentImage, setCurrentImage] = useState<XImageCropper | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const onLoad = useCallback((canvas: XCanvas) => {
    canvas.setDimensions({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight - 60,
    });

    // Clear previous objects if any
    canvas.clear();

    const centerX = canvas.width! / 2;
    const centerY = canvas.height! / 2;

    // Load a sample image for cropping
    const demoImage = new Image();
    demoImage.src =
      'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80';

    demoImage.onload = function () {
      const imgInstance = new XImageCropper(demoImage, {
        left: centerX - demoImage.width / 4,
        top: centerY - demoImage.height / 4,
        scaleX: 0.5,
        scaleY: 0.5,
        id: 'demoImage',
        boardId: 'cropDemo',
      });

      canvas.add(imgInstance);
      canvas.setActiveObject(imgInstance);
      canvas.requestRenderAll();
      setCurrentImage(imgInstance);
    };

    // Add instructions
    const title = new XTextbox('Image Cropping Demo', {
      top: 50,
      left: centerX,
      width: 400,
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      fill: '#333',
      id: 'title',
    });

    canvas.add(title);

    // Center view
    canvas.zoomToViewAllObjects();
  }, []);

  // Start the cropping operation
  const startCrop = () => {
    if (ref.current && currentImage) {
      currentImage.startCropping(ref.current);
      setIsCropping(true);
    }
  };

  // Apply the cropping
  const applyCrop = async () => {
    if (ref.current && currentImage) {
      try {
        const croppedImage = await currentImage.applyCrop(ref.current);
        if (croppedImage) {
          ref.current.remove(currentImage);
          ref.current.add(croppedImage);
          ref.current.setActiveObject(croppedImage);
          ref.current.requestRenderAll();
          setCurrentImage(croppedImage);
          setIsCropping(false);
        }
      } catch (error) {
        console.error('Error applying crop:', error);
      }
    }
  };

  // Cancel the cropping operation
  const cancelCrop = () => {
    if (ref.current && currentImage) {
      currentImage.cancelCrop(ref.current);
      setIsCropping(false);
    }
  };

  // Reset to the original image
  const resetImage = () => {
    if (ref.current && currentImage) {
      currentImage.resetToOriginal(ref.current);
    }
  };

  return (
    <div className="position-relative">
      <Canvas ref={ref} onLoad={onLoad} />

      <Box
        sx={{
          position: 'absolute',
          top: '100px',
          right: '20px',
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 'var(--joy-shadow-md)',
          width: '250px',
          zIndex: 10,
        }}
      >
        <Typography level="h4" mb={2}>
          Image Crop Tools
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          {!isCropping ? (
            <>
              <Button
                variant="solid"
                color="primary"
                onClick={startCrop}
                disabled={!currentImage}
              >
                Start Cropping
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                onClick={resetImage}
                disabled={!currentImage}
              >
                Reset to Original
              </Button>
            </>
          ) : (
            <ButtonGroup variant="solid" sx={{ width: '100%' }}>
              <Button color="success" onClick={applyCrop} sx={{ flex: 1 }}>
                Apply Crop
              </Button>
              <Button color="danger" onClick={cancelCrop} sx={{ flex: 1 }}>
                Cancel
              </Button>
            </ButtonGroup>
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />
        <Typography level="body-sm">
          {isCropping
            ? 'Drag and resize the selection rectangle to crop the image. Click Apply when ready.'
            : 'Click Start Cropping to begin. You can drag and resize the selection area.'}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 2,
          borderRadius: 2,
          boxShadow: 'var(--joy-shadow-sm)',
          maxWidth: '500px',
          zIndex: 10,
        }}
      >
        <Typography level="body-md" textAlign="center">
          This demo shows how to crop images using the XImageCropper widget. Use
          the tools on the right to start cropping, apply or cancel the crop,
          and reset to the original image.
        </Typography>
      </Box>
    </div>
  );
};

export default CropDemoPage;
