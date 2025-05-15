'use client';
import { XCanvas, XRectNotes, XCircleNotes, XTextbox, XConnector, XShapeNotes } from '@boardxus/canvasx-core';
import { type NextPage } from 'next';
import { useRef, useCallback, useState, useEffect } from 'react';
import { Canvas } from '../../components/Canvas';
import { Box, Button, Stack, Typography, Select, Option, Slider, Radio, RadioGroup } from '@mui/joy';

const ConnectorDemoPage: NextPage = () => {
    const ref = useRef<XCanvas>(null);
    const [pathType, setPathType] = useState<'curvePath' | 'straightPath'>('curvePath');
    const [arrowTip, setArrowTip] = useState<'none' | 'start' | 'end' | 'both'>('both');
    const [strokeWidth, setStrokeWidth] = useState(3);
    const [strokeColor, setStrokeColor] = useState('#4682B4');
    const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
    const [objectToConnect, setObjectToConnect] = useState<string | null>(null);
    const [connectMode, setConnectMode] = useState('manual'); // manual, automatic

    // Objects for the demonstration
    const shapes = {
        rect1: { id: 'rect1', name: 'Rectangle 1', type: 'XRectNotes', color: '#87CEEB' },
        rect2: { id: 'rect2', name: 'Rectangle 2', type: 'XRectNotes', color: '#98FB98' },
        rect3: { id: 'rect3', name: 'Rectangle 3', type: 'XRectNotes', color: '#FFB6C1' },
        circle1: { id: 'circle1', name: 'Circle 1', type: 'XCircleNotes', color: '#D8BFD8' },
        diamond1: { id: 'diamond1', name: 'Diamond', type: 'XShapeNotes', color: '#FFD700', shape: 'diamond' }
    };

    const connectors = {
        connector1: { id: 'connector1', name: 'Curved Connector', pathType: 'curvePath', arrowTip: 'both', color: '#4682B4' },
        connector2: { id: 'connector2', name: 'Straight Connector', pathType: 'straightPath', arrowTip: 'end', color: '#CD5C5C' },
        connector3: { id: 'connector3', name: 'Start Arrow Connector', pathType: 'curvePath', arrowTip: 'start', color: '#2E8B57' },
        connector4: { id: 'connector4', name: 'No Arrow Connector', pathType: 'straightPath', arrowTip: 'none', color: '#8A2BE2' }
    };

    // Check if an object is selected in the canvas
    useEffect(() => {
        if (!ref.current) return;

        const canvas = ref.current;

        const handleSelection = (e: any) => {
            const selected = e.selected?.[0];
            if (selected && selected.type === 'XConnector') {
                setSelectedConnector((selected as any).id);
                setPathType(selected.pathType);
                setArrowTip(selected.pathArrowTip);
                setStrokeWidth(selected.strokeWidth);
                setStrokeColor(selected.stroke);
            } else {
                setSelectedConnector(null);
                if (selected) {
                    setObjectToConnect((selected as any).id);
                }
            }
        };

        const handleSelectionCleared = () => {
            setSelectedConnector(null);
            setObjectToConnect(null);
        };

        canvas.on('selection:created', handleSelection);
        canvas.on('selection:updated', handleSelection);
        canvas.on('selection:cleared', handleSelectionCleared);

        return () => {
            canvas.off('selection:created', handleSelection);
            canvas.off('selection:updated', handleSelection);
            canvas.off('selection:cleared', handleSelectionCleared);
        };
    }, []);

    // Apply changes to the selected connector
    useEffect(() => {
        if (!ref.current || !selectedConnector) return;

        const canvas = ref.current;
        const connector = canvas.getObjects().find(obj => (obj as any).id === selectedConnector) as XConnector;

        if (connector) {
            connector.pathType = pathType;
            connector.pathArrowTip = arrowTip;
            connector.strokeWidth = strokeWidth;
            connector.stroke = strokeColor;

            // Update the connector's path
            connector.calcStartEndPath();
            connector.dirty = true;
            canvas.requestRenderAll();
        }
    }, [selectedConnector, pathType, arrowTip, strokeWidth, strokeColor]);

    const onLoad = useCallback(
        (canvas: XCanvas) => {
            canvas.setDimensions({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight - 60,
            });

            // Clear previous objects
            canvas.clear();

            const centerX = canvas.width! / 2;
            const centerY = canvas.height! / 2;

            // Add a title
            const title = new XTextbox('XConnector Demonstration', {
                top: 50,
                left: centerX,
                originX: 'center',
                width: 500,
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                fill: '#333',
                id: 'title',
            });

            // Add shapes
            const rect1 = new XRectNotes('Rectangle 1', {
                top: centerY - 150,
                left: centerX - 300,
                width: 150,
                height: 100,
                textAlign: 'center',
                backgroundColor: shapes.rect1.color,
                id: shapes.rect1.id,
            });

            const rect2 = new XRectNotes('Rectangle 2', {
                top: centerY - 150,
                left: centerX + 100,
                width: 150,
                height: 100,
                textAlign: 'center',
                backgroundColor: shapes.rect2.color,
                id: shapes.rect2.id,
            });

            const rect3 = new XRectNotes('Rectangle 3', {
                top: centerY + 150,
                left: centerX - 75,
                width: 150,
                height: 100,
                textAlign: 'center',
                backgroundColor: shapes.rect3.color,
                id: shapes.rect3.id,
            });

            const circle1 = new XCircleNotes('Circle 1', {
                top: centerY + 50,
                left: centerX + 250,
                radius: 75,
                textAlign: 'center',
                backgroundColor: shapes.circle1.color,
                id: shapes.circle1.id,
            });

            const diamond1 = new XShapeNotes('Diamond', {
                top: centerY - 300,
                left: centerX + 300,
                width: 150,
                height: 150,
                textAlign: 'center',
                backgroundColor: shapes.diamond1.color,
                shapeName: 'diamond', // Change from 'shape' to 'shapeName'
                id: shapes.diamond1.id,
            });

            // Create connectors with different styles
            // 1. Curved connector with both arrows (rect1 to rect3)
            const connector1 = new XConnector(
                { x: rect1.left! + rect1.width! / 2, y: rect1.top! + rect1.height! },
                { x: rect3.left! + rect3.width! / 2, y: rect3.top! },
                { x: rect1.left! + rect1.width! / 2, y: rect1.top! + rect1.height! + 50 },
                { x: rect3.left! + rect3.width! / 2, y: rect3.top! - 50 },
                {
                    stroke: connectors.connector1.color,
                    strokeWidth: 3,
                    pathArrowTip: 'both',
                    pathType: 'curvePath',
                    id: connectors.connector1.id,
                }
            );

            // 2. Straight connector with end arrow (rect2 to circle1)
            const connector2 = new XConnector(
                { x: rect2.left!, y: rect2.top! + rect2.height! / 2 },
                { x: circle1.left! - circle1.radius!, y: circle1.top! },
                { x: rect2.left! - 50, y: rect2.top! + rect2.height! / 2 },
                { x: circle1.left! - circle1.radius! - 50, y: circle1.top! },
                {
                    stroke: connectors.connector2.color,
                    strokeWidth: 3,
                    pathArrowTip: 'end',
                    pathType: 'straightPath',
                    id: connectors.connector2.id,
                }
            );

            // 3. Curved connector with start arrow (diamond1 to rect2)
            const connector3 = new XConnector(
                { x: diamond1.left! + diamond1.width! / 2, y: diamond1.top! + diamond1.height! },
                { x: rect2.left! + rect2.width! / 2, y: rect2.top! },
                { x: diamond1.left! + diamond1.width! / 2, y: diamond1.top! + diamond1.height! + 30 },
                { x: rect2.left! + rect2.width! / 2, y: rect2.top! - 30 },
                {
                    stroke: connectors.connector3.color,
                    strokeWidth: 3,
                    pathArrowTip: 'start',
                    pathType: 'curvePath',
                    id: connectors.connector3.id,
                }
            );

            // 4. Straight connector with no arrows (rect3 to circle1)
            const connector4 = new XConnector(
                { x: rect3.left! + rect3.width!, y: rect3.top! + rect3.height! / 2 },
                { x: circle1.left! - circle1.radius!, y: circle1.top! + circle1.radius! },
                { x: rect3.left! + rect3.width! + 20, y: rect3.top! + rect3.height! / 2 },
                { x: circle1.left! - circle1.radius! - 20, y: circle1.top! + circle1.radius! },
                {
                    stroke: connectors.connector4.color,
                    strokeWidth: 3,
                    pathArrowTip: 'none',
                    pathType: 'straightPath',
                    id: connectors.connector4.id,
                }
            );

            // Add instructions
            const instructions = new XTextbox('Select a connector to modify its properties or create new connectors using the panel on the right.\nYou can also drag connector endpoints to attach them to shapes.', {
                top: centerY + 300,
                left: centerX,
                originX: 'center',
                width: 600,
                textAlign: 'center',
                fontSize: 16,
                fill: '#666',
                id: 'instructions',
            });

            // Add all objects to canvas
            canvas.add(title);
            canvas.add(rect1);
            canvas.add(rect2);
            canvas.add(rect3);
            canvas.add(circle1);
            canvas.add(diamond1);
            canvas.add(connector1);
            canvas.add(connector2);
            canvas.add(connector3);
            canvas.add(connector4);
            canvas.add(instructions);

            // Center view
            canvas.zoomToViewAllObjects();
        },
        []
    );

    // Function to create a new connector
    const createNewConnector = () => {
        if (!ref.current) return;

        const canvas = ref.current;

        // Random positions if in manual mode
        if (connectMode === 'manual') {
            const width = canvas.width || 800;
            const height = canvas.height || 600;

            const x1 = Math.random() * (width - 200) + 100;
            const y1 = Math.random() * (height - 200) + 100;
            const x2 = Math.random() * (width - 200) + 100;
            const y2 = Math.random() * (height - 200) + 100;

            // Calculate control points for curved path
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            const c1x = pathType === 'curvePath' ? mx : x1;
            const c1y = pathType === 'curvePath' ? y1 : y1;
            const c2x = pathType === 'curvePath' ? mx : x2;
            const c2y = pathType === 'curvePath' ? y2 : y2;

            const newConnector = new XConnector(
                { x: x1, y: y1 },
                { x: x2, y: y2 },
                { x: c1x, y: c1y },
                { x: c2x, y: c2y },
                {
                    stroke: strokeColor,
                    strokeWidth,
                    pathArrowTip: arrowTip,
                    pathType,
                    id: `connector-${Date.now()}`,
                }
            );

            canvas.add(newConnector);
            canvas.setActiveObject(newConnector);
            canvas.requestRenderAll();
        }
        // Connect to the selected object if in automatic mode
        else if (connectMode === 'automatic' && objectToConnect) {
            const object = canvas.getObjects().find(obj => (obj as any).id === objectToConnect);
            if (!object) return;

            // Find another random object to connect to
            const otherObjects = canvas.getObjects().filter(
                obj => (obj as any).id !== objectToConnect &&
                    (obj.type === 'XRectNotes' || obj.type === 'XCircleNotes' || obj.type === 'XShapeNotes')
            );

            if (otherObjects.length === 0) return;

            const randomIndex = Math.floor(Math.random() * otherObjects.length);
            const targetObject = otherObjects[randomIndex];

            // Get positions from the objects
            const objCenterX = object.left! + (object.width ? object.width / 2 : 0);
            const objCenterY = object.top! + (object.height ? object.height / 2 : 0);

            const targetCenterX = targetObject.left! + (targetObject.width ? targetObject.width / 2 : 0);
            const targetCenterY = targetObject.top! + (targetObject.height ? targetObject.height / 2 : 0);

            // Create control points
            const midX = (objCenterX + targetCenterX) / 2;
            const midY = (objCenterY + targetCenterY) / 2;

            // Create the connector
            const newConnector = new XConnector(
                { x: objCenterX, y: objCenterY },
                { x: targetCenterX, y: targetCenterY },
                pathType === 'curvePath' ? { x: midX, y: objCenterY } : { x: objCenterX, y: objCenterY },
                pathType === 'curvePath' ? { x: midX, y: targetCenterY } : { x: targetCenterX, y: targetCenterY },
                {
                    stroke: strokeColor,
                    strokeWidth,
                    pathArrowTip: arrowTip,
                    pathType,
                    id: `connector-${Date.now()}`,
                    fromObjectId: (object as any).id,
                    toObjectId: (targetObject as any).id
                }
            );

            canvas.add(newConnector);
            canvas.setActiveObject(newConnector);
            canvas.requestRenderAll();
        }
    };

    // Delete the selected connector
    const deleteSelectedConnector = () => {
        if (!ref.current || !selectedConnector) return;

        const canvas = ref.current;
        const connector = canvas.getObjects().find(obj => (obj as any).id === selectedConnector);

        if (connector) {
            canvas.remove(connector);
            canvas.requestRenderAll();
            setSelectedConnector(null);
        }
    };

    return (
        <div className="position-relative">
            <Canvas ref={ref} onLoad={onLoad} />

            <Box
                sx={{
                    position: 'absolute',
                    top: '80px',
                    right: '20px',
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 'var(--joy-shadow-md)',
                    width: '300px',
                    zIndex: 10,
                }}
            >
                <Typography level="h4" mb={2}>XConnector Controls</Typography>

                {selectedConnector ? (
                    <Typography level="body-md" color="primary" mb={2}>
                        Editing connector: {selectedConnector}
                    </Typography>
                ) : (
                    <Typography level="body-md" mb={2}>
                        Create a new connector or select an existing one
                    </Typography>
                )}

                <Stack spacing={2}>
                    <Typography level="body-sm">Connection Mode:</Typography>
                    <RadioGroup
                        orientation="horizontal"
                        value={connectMode}
                        onChange={(e) => setConnectMode(e.target.value)}
                    >
                        <Radio value="manual" label="Manual" />
                        <Radio value="automatic" label="Automatic" />
                    </RadioGroup>

                    <Typography level="body-sm">Path Type:</Typography>
                    <Select
                        value={pathType}
                        onChange={(_, value) => setPathType(value as 'curvePath' | 'straightPath')}
                    >
                        <Option value="curvePath">Curved Path</Option>
                        <Option value="straightPath">Straight Path</Option>
                    </Select>

                    <Typography level="body-sm">Arrow Tips:</Typography>
                    <Select
                        value={arrowTip}
                        onChange={(_, value) => setArrowTip(value as 'none' | 'start' | 'end' | 'both')}
                    >
                        <Option value="none">None</Option>
                        <Option value="start">Start</Option>
                        <Option value="end">End</Option>
                        <Option value="both">Both</Option>
                    </Select>

                    <Typography level="body-sm">Stroke Width: {strokeWidth}</Typography>
                    <Slider
                        min={1}
                        max={10}
                        value={strokeWidth}
                        onChange={(_, value) => setStrokeWidth(value as number)}
                    />

                    <Typography level="body-sm">Stroke Color:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {['#4682B4', '#CD5C5C', '#2E8B57', '#8A2BE2', '#000000', '#FF8C00', '#9932CC'].map(color => (
                            <Box
                                key={color}
                                sx={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: color,
                                    border: strokeColor === color ? '2px solid black' : '1px solid #ccc',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                                onClick={() => setStrokeColor(color)}
                            />
                        ))}
                    </Box>

                    <Button
                        variant="solid"
                        color="primary"
                        onClick={createNewConnector}
                        disabled={connectMode === 'automatic' && !objectToConnect}
                    >
                        Create Connector
                    </Button>

                    {selectedConnector && (
                        <Button
                            variant="soft"
                            color="danger"
                            onClick={deleteSelectedConnector}
                        >
                            Delete Selected Connector
                        </Button>
                    )}
                </Stack>
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
                    maxWidth: '600px',
                    zIndex: 10,
                }}
            >
                <Typography level="body-md" textAlign="center">
                    {selectedConnector
                        ? "Modify the selected connector's properties using the panel. Drag endpoints to connect to shapes."
                        : objectToConnect
                            ? `Selected object: ${objectToConnect}. Use automatic mode to create connectors from this object.`
                            : "Select a connector to edit its properties or select a shape to create new connections."
                    }
                </Typography>
            </Box>
        </div>
    );
};

export default ConnectorDemoPage;
