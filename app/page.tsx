'use client';
import { Typography, Card, Grid, Box, Button } from '@mui/joy';
import { useRouter } from 'next/navigation';
import 'fabric';

const Homepage = () => {
  const router = useRouter();
  return (
    <Box>
      <Typography level="h1" textAlign="center" mb={4}>
        CanvasX UI Component Demo
      </Typography>

      <Grid container spacing={4} sx={{ margin: 10 }}>
        <Grid xs={12} md={8} component="div">
          <Card variant="outlined" sx={{ bgcolor: '#f0f7ff' }}>
            <Box textAlign="center" p={2}>
              <Typography level="h2">🌟 All Components Demo 🌟</Typography>
              <Typography level="body-md" mb={2}>
                Explore all widgets in one interactive showcase
              </Typography>
              <Button
                variant="solid"
                size="lg"
                color="primary"
                sx={{ fontWeight: 'bold' }}
                onClick={() => {
                  router.push('/alldemos');
                }}
              >
                Launch Complete Demo
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4} component="div">
          <Card variant="outlined">
            <Box textAlign="center" p={2}>
              <Typography level="h2">Text</Typography>
              <Button
                variant="solid"
                onClick={() => {
                  router.push('/text');
                }}
              >
                Text
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4} component="div">
          <Card variant="outlined">
            <Box textAlign="center" p={2}>
              <Typography level="h2">Sticky Notes</Typography>
              <Button
                variant="solid"
                onClick={() => {
                  router.push('/notes');
                }}
              >
                Sticky Notes
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4} component="div">
          <Card variant="outlined">
            <Box textAlign="center" p={2}>
              <Typography level="h2">Shapes</Typography>
              <Button
                variant="solid"
                onClick={() => {
                  router.push('/shapes');
                }}
              >
                Shapes
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4} component="div">
          <Card variant="outlined">
            <Box textAlign="center" p={2}>
              <Typography level="h2">Connector</Typography>
              <Button
                variant="solid"
                onClick={() => {
                  router.push('/connector');
                }}
              >
                Connector
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4} component="div">
          <Card variant="outlined" sx={{ bgcolor: '#f5f5ff' }}>
            <Box textAlign="center" p={2}>
              <Typography level="h2">XConnector Demo</Typography>
              <Typography level="body-sm" mb={1}>
                Interactive demo of XConnector capabilities
              </Typography>
              <Button
                variant="solid"
                color="primary"
                onClick={() => {
                  router.push('/connector-demo');
                }}
              >
                XConnector Demo
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4} component="div">
          <Card variant="outlined" sx={{ bgcolor: '#f5fff5' }}>
            <Box textAlign="center" p={2}>
              <Typography level="h2">XConnector Docs</Typography>
              <Typography level="body-sm" mb={1}>
                Complete documentation and examples
              </Typography>
              <Button
                variant="solid"
                color="success"
                onClick={() => {
                  router.push('/connector-docs');
                }}
              >
                XConnector Documentation
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4} component="div">
          <Card variant="outlined">
            <Box textAlign="center" p={2}>
              <Typography level="h2">Alignment & Guideline</Typography>
              <Button
                variant="solid"
                onClick={() => {
                  router.push('/align');
                }}
              >
                Alignment & Guideline
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={4} component="div">
          <Card variant="outlined">
            <Box textAlign="center" p={2}>
              <Typography level="h2">Draw</Typography>
              <Button
                variant="solid"
                onClick={() => {
                  router.push('/draw');
                }}
              >
                Draw
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
