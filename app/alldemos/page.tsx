'use client';
import { XCanvas, XRectNotes, XCircleNotes, XTextbox, XImage, XConnector, XMarkdown, XChart, XFrame, XPath, XGroup, XShapeNotes } from '@boardxus/canvasx';
import { type NextPage } from 'next';
import { useRef, useCallback, useState } from 'react';
import { Canvas } from '../../components/Canvas';
import { Box, Button, Stack, Typography, Slider, Select, Option, Divider, Tabs, TabList, Tab, TabPanel } from '@mui/joy';

const AllDemosPage: NextPage = () => {
    const ref = useRef<XCanvas>(null);
    const [activeDemo, setActiveDemo] = useState('connectors');
    const [pathType, setPathType] = useState<'curvePath' | 'straightPath'>('curvePath');
    const [arrowTip, setArrowTip] = useState<'none' | 'start' | 'end' | 'both'>('both');
    const [strokeWidth, setStrokeWidth] = useState(3);
    const [strokeColor, setStrokeColor] = useState('#4682B4');

    const onLoad = useCallback(
        (canvas: XCanvas) => {
            canvas.setDimensions({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight - 60,
            });

            // Clear previous objects if any
            canvas.clear();

            const centerX = canvas.width! / 2;
            const centerY = canvas.height! / 2;

            // Populate demo based on active selection
            if (activeDemo === 'connectors') {
                loadConnectorDemo(canvas, centerX, centerY);
            } else if (activeDemo === 'notes') {
                loadNotesDemo(canvas, centerX, centerY);
            } else if (activeDemo === 'text') {
                loadTextDemo(canvas, centerX, centerY);
            } else if (activeDemo === 'shapes') {
                loadShapesDemo(canvas, centerX, centerY);
            } else if (activeDemo === 'combined') {
                loadCombinedDemo(canvas, centerX, centerY);
            }

            // Center view
            canvas.zoomToViewAllObjects();
        },
        [activeDemo]
    );

    // Connector Demo
    const loadConnectorDemo = (canvas: XCanvas, centerX: number, centerY: number) => {
        // Create some shapes to connect
        const rect1 = new XRectNotes('Drag connector', {
            top: centerY - 150,
            left: centerX - 300,
            width: 150,
            height: 100,
            textAlign: 'center',
            backgroundColor: '#87CEEB', // light blue
            id: 'rect1',
        });

        const rect2 = new XRectNotes('endpoints', {
            top: centerY - 150,
            left: centerX + 100,
            width: 150,
            height: 100,
            textAlign: 'center',
            backgroundColor: '#98FB98', // light green
            id: 'rect2',
        });

        const rect3 = new XRectNotes('to connect objects', {
            top: centerY + 150,
            left: centerX - 75,
            width: 150,
            height: 100,
            textAlign: 'center',
            backgroundColor: '#FFB6C1', // light pink
            id: 'rect3',
        });

        const circle = new XCircleNotes('Circle Note', {
            top: centerY + 50,
            left: centerX + 250,
            radius: 75,
            textAlign: 'center',
            backgroundColor: '#D8BFD8', // light purple
            id: 'circle1',
        });

        // Add text instructions
        const text = new XTextbox('Connector Demo\n\nTry creating and connecting different types of connectors between shapes', {
            top: centerY - 300,
            left: centerX,
            width: 400,
            textAlign: 'center',
            fontSize: 20,
            fill: '#333',
            id: 'instructions',
        });

        // Add objects to canvas
        canvas.add(rect1);
        canvas.add(rect2);
        canvas.add(rect3);
        canvas.add(circle);
        canvas.add(text);

        // Create one sample curved connector with end arrow
        const connector1 = new XConnector(
            { x: rect1.left! + rect1.width! / 2, y: rect1.top! + rect1.height! },
            { x: rect3.left! + rect3.width! / 2, y: rect3.top! },
            { x: rect1.left! + rect1.width! / 2, y: rect1.top! + rect1.height! + 50 },
            { x: rect3.left! + rect3.width! / 2, y: rect3.top! - 50 },
            {
                stroke: '#4682B4',
                strokeWidth: 3,
                pathArrowTip: 'end',
                pathType: 'curvePath',
                id: 'demoConnector1',
            }
        );

        // Create one sample straight connector with both arrows
        const connector2 = new XConnector(
            { x: rect2.left!, y: rect2.top! + rect2.height! / 2 },
            { x: circle.left! - circle.radius!, y: circle.top! },
            { x: rect2.left! - 50, y: rect2.top! + rect2.height! / 2 },
            { x: circle.left! - circle.radius! - 50, y: circle.top! },
            {
                stroke: '#CD5C5C',
                strokeWidth: 3,
                pathArrowTip: 'both',
                pathType: 'straightPath',
                id: 'demoConnector2',
            }
        );

        canvas.add(connector1);
        canvas.add(connector2);
    };

    // Notes Demo
    const loadNotesDemo = (canvas: XCanvas, centerX: number, centerY: number) => {
        // Rectangle notes
        const rect1 = new XRectNotes('Rectangle Note\nResizable & Draggable', {
            top: centerY - 150,
            left: centerX - 300,
            width: 200,
            height: 120,
            textAlign: 'center',
            backgroundColor: '#87CEEB', // light blue
            id: 'rectNote1',
        });

        const rect2 = new XRectNotes('Rectangle Note with\nCustom Background', {
            top: centerY - 150,
            left: centerX + 100,
            width: 200,
            height: 120,
            textAlign: 'center',
            backgroundColor: '#FFA07A', // light salmon
            id: 'rectNote2',
        });

        // Circle notes
        const circle1 = new XCircleNotes('Circle Note', {
            top: centerY + 100,
            left: centerX - 250,
            radius: 75,
            textAlign: 'center',
            backgroundColor: '#98FB98', // light green
            id: 'circleNote1',
        });

        const circle2 = new XCircleNotes('Circle Note with\nCustom Background', {
            top: centerY + 100,
            left: centerX + 100,
            radius: 75,
            textAlign: 'center',
            backgroundColor: '#D8BFD8', // light purple
            id: 'circleNote2',
        });

        // Shape notes - different shapes
        const shape1 = new XShapeNotes('Diamond Note', {
            top: centerY + 300,
            left: centerX - 150,
            width: 150,
            height: 150,
            textAlign: 'center',
            backgroundColor: '#FFD700', // gold
            shapeName: 'diamond',
            id: 'shapeNote1',
        });

        const shape2 = new XShapeNotes('Triangle Note', {
            top: centerY + 300,
            left: centerX + 150,
            width: 150,
            height: 150,
            textAlign: 'center',
            backgroundColor: '#20B2AA', // light sea green
            shapeName: 'triangle',
            id: 'shapeNote2',
        });

        // Add title
        const title = new XTextbox('Notes Demo - Various Types of Notes', {
            top: centerY - 350,
            left: centerX,
            width: 500,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            fill: '#333',
            id: 'notesTitle',
        });

        canvas.add(title);
        canvas.add(rect1);
        canvas.add(rect2);
        canvas.add(circle1);
        canvas.add(circle2);
        canvas.add(shape1);
        canvas.add(shape2);
    };

    // Text Demo
    const loadTextDemo = (canvas: XCanvas, centerX: number, centerY: number) => {
        // Text boxes with different styles
        const title = new XTextbox('Text Components Demo', {
            top: centerY - 350,
            left: centerX,
            width: 500,
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#333',
            id: 'textTitle',
        });

        const textbox1 = new XTextbox('Regular Textbox\nMultiple lines of text can be added.\nThe text will wrap when it reaches the end of the box.', {
            top: centerY - 200,
            left: centerX - 250,
            width: 300,
            fontSize: 18,
            fill: '#333',
            id: 'textbox1',
        });

        const textbox2 = new XTextbox('Styled Textbox', {
            top: centerY - 200,
            left: centerX + 150,
            width: 300,
            fontSize: 22,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#D2691E',
            id: 'textbox2',
        });

        const textbox3 = new XTextbox('Centered Text With Background', {
            top: centerY,
            left: centerX - 250,
            width: 300,
            fontSize: 20,
            textAlign: 'center',
            fill: '#FFF',
            backgroundColor: '#4682B4',
            padding: 10,
            id: 'textbox3',
        });

        // Markdown text sample
        const markdownContent = '# Markdown Support\n\n- Bullet points\n- **Bold text**\n- *Italic text*\n\n[Links](https://example.com)\n\n```\nCode blocks\n```';
        const markdown = new XMarkdown(markdownContent, {
            top: centerY + 80,
            left: centerX + 150,
            width: 300,
            height: 300,
            id: 'markdown1',
            markdownText: markdownContent,
            boardId: 'demoBoard',
            backgroundColor: '#FFFFFF',
            objType: 'XMarkdown',
            // Add required properties from WidgetMarkdownInterface
            locked: false,
            originX: 'center',
            originY: 'center',
            scaleX: 1,
            scaleY: 1,
            selectable: true,
            zIndex: Date.now() * 100,
            version: '1.0',
            updatedAt: Date.now(),
            createdAt: Date.now(),
            createdBy: '',
            updatedBy: '',
            updatedByName: '',
            createdByName: '',
            visible: true
        });

        canvas.add(title);
        canvas.add(textbox1);
        canvas.add(textbox2);
        canvas.add(textbox3);
        canvas.add(markdown);
    };

    // Shapes Demo
    const loadShapesDemo = (canvas: XCanvas, centerX: number, centerY: number) => {
        const title = new XTextbox('Shapes & Paths Demo', {
            top: centerY - 350,
            left: centerX,
            width: 500,
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#333',
            id: 'shapesTitle',
        });

        // Simple path
        const path1 = new XPath('M 100 100 L 200 100 L 200 200 L 100 200 Z', {
            top: centerY - 200,
            left: centerX - 350,
            fill: '#B0C4DE',
            stroke: '#4682B4',
            strokeWidth: 2,
            id: 'path1',
        });

        // Complex path - heart shape
        const heartPath = 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z';
        const path2 = new XPath(heartPath, {
            top: centerY - 200,
            left: centerX,
            fill: '#FF6B6B',
            stroke: '#C74B50',
            strokeWidth: 2,
            scaleX: 2,
            scaleY: 2,
            id: 'path2',
        });

        // Star shape
        const starPath = 'M 50 0 L 61 35 L 98 35 L 67 57 L 79 91 L 50 70 L 21 91 L 33 57 L 2 35 L 39 35 Z';
        const path3 = new XPath(starPath, {
            top: centerY - 200,
            left: centerX + 300,
            fill: '#FFD700',
            stroke: '#FF8C00',
            strokeWidth: 2,
            scaleX: 2,
            scaleY: 2,
            id: 'path3',
        });

        // Shape notes
        const shape1 = new XShapeNotes('Diamond', {
            top: centerY + 100,
            left: centerX - 300,
            width: 150,
            height: 150,
            textAlign: 'center',
            backgroundColor: '#98FB98',
            shapeName: 'diamond',
            id: 'diamond',
        });

        const shape2 = new XShapeNotes('Hexagon', {
            top: centerY + 100,
            left: centerX,
            width: 150,
            height: 150,
            textAlign: 'center',
            backgroundColor: '#87CEFA',
            shapeName: 'hexagon',
            id: 'hexagon',
        });

        const shape3 = new XShapeNotes('Triangle', {
            top: centerY + 100,
            left: centerX + 300,
            width: 150,
            height: 150,
            textAlign: 'center',
            backgroundColor: '#FFA07A',
            shapeName: 'triangle',
            id: 'triangle',
        });

        canvas.add(title);
        canvas.add(path1);
        canvas.add(path2);
        canvas.add(path3);
        canvas.add(shape1);
        canvas.add(shape2);
        canvas.add(shape3);
    };

    // Combined Demo
    const loadCombinedDemo = (canvas: XCanvas, centerX: number, centerY: number) => {
        // Create a group of objects that represent a diagram
        const title = new XTextbox('Flow Chart Example', {
            top: centerY - 400,
            left: centerX,
            width: 400,
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#333',
            id: 'flowChartTitle',
        });

        // Start node
        const startNode = new XRectNotes('Start', {
            top: centerY - 300,
            left: centerX,
            width: 120,
            height: 60,
            textAlign: 'center',
            backgroundColor: '#90EE90', // light green
    
            id: 'startNode',
        });

        // Decision node
        const decisionNode = new XShapeNotes('Decision?', {
            top: centerY - 150,
            left: centerX,
            width: 150,
            height: 150,
            textAlign: 'center',
            backgroundColor: '#FFD700', // gold
            shapeName: 'diamond',
            id: 'decisionNode',
        });

        // Left process node
        const leftProcess = new XRectNotes('Process A', {
            top: centerY,
            left: centerX - 200,
            width: 120,
            height: 60,
            textAlign: 'center',
            backgroundColor: '#87CEFA', // light sky blue
            id: 'leftProcess',
        });

        // Right process node
        const rightProcess = new XRectNotes('Process B', {
            top: centerY,
            left: centerX + 200,
            width: 120,
            height: 60,
            textAlign: 'center',
            backgroundColor: '#87CEFA', // light sky blue
            id: 'rightProcess',
        });

        // End node
        const endNode = new XRectNotes('End', {
            top: centerY + 150,
            left: centerX,
            width: 120,
            height: 60,
            textAlign: 'center',
            backgroundColor: '#FFA07A', // light salmon

            id: 'endNode',
        });

        // Add nodes to canvas
        canvas.add(title);
        canvas.add(startNode);
        canvas.add(decisionNode);
        canvas.add(leftProcess);
        canvas.add(rightProcess);
        canvas.add(endNode);

        // Add connectors
        // Start to Decision
        const connector1 = new XConnector(
            { x: startNode.left! + startNode.width! / 2, y: startNode.top! + startNode.height! },
            { x: decisionNode.left! + decisionNode.width! / 2, y: decisionNode.top! },
            { x: startNode.left! + startNode.width! / 2, y: startNode.top! + startNode.height! + 20 },
            { x: decisionNode.left! + decisionNode.width! / 2, y: decisionNode.top! - 20 },
            {
                stroke: '#4682B4',
                strokeWidth: 2,
                pathArrowTip: 'end',
                pathType: 'straightPath',
                id: 'connector1',
            }
        );

        // Decision to Left Process
        const connector2 = new XConnector(
            { x: decisionNode.left!, y: decisionNode.top! + decisionNode.height! / 2 },
            { x: leftProcess.left! + leftProcess.width!, y: leftProcess.top! + leftProcess.height! / 2 },
            { x: decisionNode.left! - 50, y: decisionNode.top! + decisionNode.height! / 2 },
            { x: leftProcess.left! + leftProcess.width! + 50, y: leftProcess.top! + leftProcess.height! / 2 },
            {
                stroke: '#4682B4',
                strokeWidth: 2,
                pathArrowTip: 'end',
                pathType: 'curvePath',
                id: 'connector2',
            }
        );

        // Decision to Right Process
        const connector3 = new XConnector(
            { x: decisionNode.left! + decisionNode.width!, y: decisionNode.top! + decisionNode.height! / 2 },
            { x: rightProcess.left!, y: rightProcess.top! + rightProcess.height! / 2 },
            { x: decisionNode.left! + decisionNode.width! + 50, y: decisionNode.top! + decisionNode.height! / 2 },
            { x: rightProcess.left! - 50, y: rightProcess.top! + rightProcess.height! / 2 },
            {
                stroke: '#4682B4',
                strokeWidth: 2,
                pathArrowTip: 'end',
                pathType: 'curvePath',
                id: 'connector3',
            }
        );

        // Left Process to End
        const connector4 = new XConnector(
            { x: leftProcess.left! + leftProcess.width! / 2, y: leftProcess.top! + leftProcess.height! },
            { x: endNode.left! - endNode.width! / 4, y: endNode.top! },
            { x: leftProcess.left! + leftProcess.width! / 2, y: leftProcess.top! + leftProcess.height! + 20 },
            { x: endNode.left! - endNode.width! / 4, y: endNode.top! - 20 },
            {
                stroke: '#4682B4',
                strokeWidth: 2,
                pathArrowTip: 'end',
                pathType: 'curvePath',
                id: 'connector4',
            }
        );

        // Right Process to End
        const connector5 = new XConnector(
            { x: rightProcess.left! + rightProcess.width! / 2, y: rightProcess.top! + rightProcess.height! },
            { x: endNode.left! + endNode.width! / 4 * 3, y: endNode.top! },
            { x: rightProcess.left! + rightProcess.width! / 2, y: rightProcess.top! + rightProcess.height! + 20 },
            { x: endNode.left! + endNode.width! / 4 * 3, y: endNode.top! - 20 },
            {
                stroke: '#4682B4',
                strokeWidth: 2,
                pathArrowTip: 'end',
                pathType: 'curvePath',
                id: 'connector5',
            }
        );

        // Add labels for Yes/No
        const yesLabel = new XTextbox('Yes', {
            top: decisionNode.top! + decisionNode.height! / 2 - 20,
            left: centerX + 50,
            fontSize: 16,
            fill: '#333',
            id: 'yesLabel',
        });

        const noLabel = new XTextbox('No', {
            top: decisionNode.top! + decisionNode.height! / 2 - 20,
            left: centerX - 50,
            fontSize: 16,
            fill: '#333',
            id: 'noLabel',
        });

        // Add annotations
        const annotation = new XTextbox('This is a sample flowchart demonstrating\nconnectors between different shapes', {
            top: centerY + 250,
            left: centerX,
            width: 400,
            textAlign: 'center',
            fontSize: 16,
            fill: '#666',
            id: 'annotation',
        });

        // Add connectors and labels
        canvas.add(connector1);
        canvas.add(connector2);
        canvas.add(connector3);
        canvas.add(connector4);
        canvas.add(connector5);
        canvas.add(yesLabel);
        canvas.add(noLabel);
        canvas.add(annotation);
    };

    // Function to create a new connector
    const createNewConnector = () => {
        if (!ref.current) return;

        const canvas = ref.current;
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
    };

    return (
        <div className="position-relative">
            <Canvas ref={ref} onLoad={onLoad} />

            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: 'white',
                zIndex: 100,
                boxShadow: 'var(--joy-shadow-sm)',
            }}>
                <Typography level="h3" textAlign="center" mt={1}>
                    CanvasX Widget Demos
                </Typography>
                <Tabs
                    value={activeDemo}
                    onChange={(_, value) => setActiveDemo(value as string)}
                    sx={{
                        borderRadius: 0,
                        '& button': {
                            flex: 1,
                            borderRadius: 0,
                        }
                    }}
                >
                    <TabList sx={{ width: '100%' }}>
                        <Tab value="connectors">Connectors</Tab>
                        <Tab value="notes">Notes</Tab>
                        <Tab value="text">Text</Tab>
                        <Tab value="shapes">Shapes</Tab>
                        <Tab value="combined">Combined Demo</Tab>
                    </TabList>
                </Tabs>
            </Box>

            {activeDemo === 'connectors' && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '130px',
                        right: '20px',
                        backgroundColor: 'white',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 'var(--joy-shadow-md)',
                        width: '250px',
                        zIndex: 10,
                    }}
                >
                    <Typography level="h4" mb={2}>Connector Tools</Typography>

                    <Stack spacing={2}>
                        <Typography level="body-sm">Path Type:</Typography>
                        <Select
                            value={pathType}
                            onChange={(_, value) => setPathType(value as 'curvePath' | 'straightPath')}
                            sx={{ mb: 2 }}
                        >
                            <Option value="curvePath">Curved Path</Option>
                            <Option value="straightPath">Straight Path</Option>
                        </Select>

                        <Typography level="body-sm">Arrow Tips:</Typography>
                        <Select
                            value={arrowTip}
                            onChange={(_, value) => setArrowTip(value as 'none' | 'start' | 'end' | 'both')}
                            sx={{ mb: 2 }}
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
                            sx={{ mb: 2 }}
                        />

                        <Typography level="body-sm">Stroke Color:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {['#4682B4', '#CD5C5C', '#2E8B57', '#8A2BE2', '#000000'].map(color => (
                                <Box
                                    key={color}
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor: color,
                                        border: strokeColor === color ? '2px solid black' : '1px solid #ccc',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setStrokeColor(color)}
                                />
                            ))}
                        </Box>

                        <Button
                            variant="solid"
                            color="primary"
                            onClick={createNewConnector}
                        >
                            Create New Connector
                        </Button>
                    </Stack>
                </Box>
            )}

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
                    {activeDemo === 'connectors' && "Drag connector endpoints to connect shapes. Use the tools to create new connectors."}
                    {activeDemo === 'notes' && "Explore different types of notes. All are resizable, draggable, and can be edited."}
                    {activeDemo === 'text' && "Text and markdown components with different styles and formatting options."}
                    {activeDemo === 'shapes' && "Various path-based shapes and custom shape notes."}
                    {activeDemo === 'combined' && "A sample flowchart showing how different components can work together."}
                </Typography>
            </Box>
        </div>
    );
};

export default AllDemosPage;
