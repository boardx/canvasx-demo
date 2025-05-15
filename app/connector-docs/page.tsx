'use client';
import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, List, ListItem, Card, CardContent } from '@mui/joy';
import { type NextPage } from 'next';
import { useRouter } from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const XConnectorDocsPage: NextPage = () => {
    const router = useRouter();

    return (
        <Box sx={{ padding: 4, maxWidth: '1000px', margin: '0 auto' }}>
            <Typography level="h1" textAlign="center" mb={1}>
                XConnector Documentation
            </Typography>

            <Typography level="body-lg" textAlign="center" mb={4} color="neutral">
                A comprehensive guide to the XConnector widget in CanvasX
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
                <Card variant="outlined" sx={{ cursor: 'pointer' }} onClick={() => router.push('/connector-demo')}>
                    <CardContent>
                        <Typography level="title-md">XConnector Interactive Demo</Typography>
                        <Typography level="body-sm">Try the interactive demo to see XConnector in action</Typography>
                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ cursor: 'pointer' }} onClick={() => router.push('/alldemos')}>
                    <CardContent>
                        <Typography level="title-md">All Widgets Demo</Typography>
                        <Typography level="body-sm">Explore all widgets including XConnector</Typography>
                    </CardContent>
                </Card>
            </Box>

            <Typography level="h2" mb={2}>Overview</Typography>
            <Typography level="body-md" mb={4}>
                The XConnector widget is a powerful tool for creating line connections between objects in your CanvasX applications.
                It extends the FabricJS Path class and implements the WidgetConnectorInterface to provide a rich set of features
                for creating both straight and curved connections with customizable arrow tips at either or both ends.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography level="h2" mb={2}>Properties</Typography>
            <Card variant="outlined" sx={{ mb: 4 }}>
                <List>
                    <ListItem>
                        <Typography level="title-sm" sx={{ minWidth: '150px' }}>pathType</Typography>
                        <Typography level="body-sm">
                            Type: 'curvePath' | 'straightPath'<br />
                            Controls whether the connector is drawn as a curved (bezier) path or a straight line
                        </Typography>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <Typography level="title-sm" sx={{ minWidth: '150px' }}>pathArrowTip</Typography>
                        <Typography level="body-sm">
                            Type: 'none' | 'start' | 'end' | 'both'<br />
                            Determines where arrow tips are displayed on the connector
                        </Typography>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <Typography level="title-sm" sx={{ minWidth: '150px' }}>fromPoint</Typography>
                        <Typography level="body-sm">
                            Type: XY (coordinate)<br />
                            The starting point coordinates of the connector
                        </Typography>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <Typography level="title-sm" sx={{ minWidth: '150px' }}>toPoint</Typography>
                        <Typography level="body-sm">
                            Type: XY (coordinate)<br />
                            The ending point coordinates of the connector
                        </Typography>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <Typography level="title-sm" sx={{ minWidth: '150px' }}>control1, control2</Typography>
                        <Typography level="body-sm">
                            Type: XY (coordinate)<br />
                            Control points for bezier curves
                        </Typography>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <Typography level="title-sm" sx={{ minWidth: '150px' }}>fromObjectId, toObjectId</Typography>
                        <Typography level="body-sm">
                            Type: string<br />
                            IDs of objects connected at the starting and ending points
                        </Typography>
                    </ListItem>
                </List>
            </Card>

            <Typography level="h2" mb={2}>Methods</Typography>
            <Accordion>
                <AccordionSummary>
                    <Typography level="title-md">
                        Constructor(fromPoint, toPoint, control1, control2, options)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography level="body-sm" mb={2}>
                        Creates a new XConnector instance with specified points and options.
                    </Typography>
                    <Typography level="body-sm" sx={{ whiteSpace: 'pre-wrap' }}>
                        {`const connector = new XConnector(
  { x: 100, y: 100 },     // fromPoint
  { x: 300, y: 300 },     // toPoint
  { x: 100, y: 200 },     // control1
  { x: 300, y: 200 },     // control2
  {
    pathType: 'curvePath',
    pathArrowTip: 'both',
    stroke: '#4682B4',
    strokeWidth: 2,
    id: 'myConnector'
  }
);`}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography level="title-md">
                        calcStartEndPath()
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography level="body-sm">
                        Calculates the drawing commands for the connector's arrow tips based on the current
                        pathType and pathArrowTip settings. This method is called automatically when the
                        connector is updated or created.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography level="title-md">
                        update(options)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography level="body-sm" mb={2}>
                        Updates the connector's points and styling. All parameters are optional - only those provided will be updated.
                    </Typography>
                    <Typography level="body-sm" sx={{ whiteSpace: 'pre-wrap' }}>
                        {`connector.update({
  fromPoint: { x: 150, y: 150 },
  toPoint: { x: 350, y: 350 },
  control1: { x: 150, y: 250 },
  control2: { x: 350, y: 250 },
  style: { /* custom styles */ }
});`}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography level="title-md">
                        getFromPoint(), getToPoint()
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography level="body-sm">
                        Returns Point objects representing the start and end points of the connector.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography level="title-md">
                        calculateControlPoint(controlPointType, point)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography level="body-sm">
                        Calculates control points when connecting to objects. The controlPointType parameter can be 'from' or 'to'.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 4 }} />

            <Typography level="h2" mb={2}>Usage Examples</Typography>

            <Accordion defaultExpanded>
                <AccordionSummary>
                    <Typography level="title-md">
                        Basic XConnector Creation
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography level="body-sm" sx={{ whiteSpace: 'pre-wrap' }}>
                        {`// Create a straight connector with arrow at the end
const straightConnector = new XConnector(
  { x: 100, y: 100 },
  { x: 300, y: 100 },
  { x: 100, y: 100 },
  { x: 300, y: 100 },
  {
    pathType: 'straightPath',
    pathArrowTip: 'end',
    stroke: '#4682B4',
    strokeWidth: 2,
    id: 'straightConnector'
  }
);

// Create a curved connector with arrows at both ends
const curvedConnector = new XConnector(
  { x: 100, y: 200 },
  { x: 300, y: 200 },
  { x: 150, y: 150 },
  { x: 250, y: 250 },
  {
    pathType: 'curvePath',
    pathArrowTip: 'both',
    stroke: '#CD5C5C',
    strokeWidth: 3,
    id: 'curvedConnector'
  }
);

// Add to canvas
canvas.add(straightConnector);
canvas.add(curvedConnector);`}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography level="title-md">
                        Connecting Objects
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography level="body-sm" sx={{ whiteSpace: 'pre-wrap' }}>
                        {`// Create objects to connect
const rect1 = new XRectNotes('Rectangle 1', {
  top: 100,
  left: 100,
  width: 150,
  height: 100,
  id: 'rect1',
});

const rect2 = new XRectNotes('Rectangle 2', {
  top: 300,
  left: 300,
  width: 150,
  height: 100,
  id: 'rect2',
});

// Create a connector between the objects
const connector = new XConnector(
  { x: rect1.left + rect1.width, y: rect1.top + rect1.height/2 },
  { x: rect2.left, y: rect2.top + rect2.height/2 },
  { x: rect1.left + rect1.width + 50, y: rect1.top + rect1.height/2 },
  { x: rect2.left - 50, y: rect2.top + rect2.height/2 },
  {
    pathType: 'curvePath',
    pathArrowTip: 'end',
    stroke: '#4682B4',
    strokeWidth: 2,
    id: 'objectConnector',
    fromObjectId: rect1.id,
    toObjectId: rect2.id
  }
);

// Add to canvas
canvas.add(rect1);
canvas.add(rect2);
canvas.add(connector);`}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography level="title-md">
                        Updating Connectors
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography level="body-sm" sx={{ whiteSpace: 'pre-wrap' }}>
                        {`// Get a connector
const connector = canvas.getObjects().find(obj => obj.id === 'myConnector');

// Update its properties
if (connector && connector.type === 'XConnector') {
  // Change path type
  connector.pathType = 'straightPath';
  
  // Change arrow tips
  connector.pathArrowTip = 'both';
  
  // Change appearance
  connector.stroke = '#FF0000';
  connector.strokeWidth = 5;
  
  // Update endpoints
  connector.update({
    fromPoint: { x: 150, y: 150 },
    toPoint: { x: 350, y: 350 }
  });
  
  // Don't forget to recalculate paths and redraw
  connector.calcStartEndPath();
  connector.dirty = true;
  canvas.requestRenderAll();
}`}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 4 }} />

            <Typography level="h2" mb={2}>Tips & Best Practices</Typography>

            <Card variant="outlined" sx={{ mb: 4 }}>
                <List>
                    <ListItem>
                        <Typography level="body-md">
                            <strong>Automatic Connection:</strong> When connecting objects, set the fromObjectId and toObjectId properties
                            to make the connector stay attached to the objects when they move.
                        </Typography>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <Typography level="body-md">
                            <strong>Control Points:</strong> For curved connectors, position control points away from the direct line between
                            start and end points to create a nice curve.
                        </Typography>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <Typography level="body-md">
                            <strong>Performance:</strong> For complex diagrams with many connectors, consider setting objectCaching to true
                            for better performance.
                        </Typography>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <Typography level="body-md">
                            <strong>Path Updates:</strong> Always call calcStartEndPath() after making changes to path properties to ensure
                            arrow tips are correctly drawn.
                        </Typography>
                    </ListItem>
                </List>
            </Card>
        </Box>
    );
};

export default XConnectorDocsPage;
