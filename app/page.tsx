//@ts-nocheck
'use client';
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardOverflow,
  AspectRatio,
  Divider,
  Chip,
} from '@mui/joy';
import { useRouter } from 'next/navigation';
import 'fabric';
import { useEffect, useState } from 'react';

const Homepage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          py: 6,
          px: 2,
          borderRadius: 'lg',
          background: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
          color: 'white',
          boxShadow: 'lg',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/logo_1.svg") no-repeat center center',
            opacity: 0.05,
            backgroundSize: '80%',
            zIndex: 0,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            level="h1"
            fontSize={{ xs: '2.5rem', md: '3.5rem' }}
            fontWeight="bold"
            mb={2}
          >
            CanvasX
          </Typography>
          <Typography
            level="title-lg"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4, opacity: 0.9 }}
          >
            A powerful canvas-based UI component library for creating
            interactive diagrams, flowcharts, and visual applications with ease.
          </Typography>
        </Box>
      </Box>

      {/* Main Categories */}
      <Typography
        level="h2"
        sx={{
          mb: 4,
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#1e293b',
          position: 'relative',
        }}
      >
        <Box
          component="span"
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '10%',
              width: '80%',
              height: '4px',
              background: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
              borderRadius: '2px',
            },
          }}
        >
          Component Categories
        </Box>
      </Typography>

      <Grid container spacing={3} sx={{ mb: 8 }}>
        {/* Core Components Section */}
        <Grid xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: 'md',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ mb: 2 }}>
                <Typography level="title-lg" color="primary" fontWeight="bold">
                  Basic Components
                </Typography>
                <Divider sx={{ my: 1.5 }} />
              </Box>
              <Grid container spacing={1.5}>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="primary"
                    onClick={() => router.push('/text')}
                    startDecorator="T"
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Text
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="success"
                    onClick={() => router.push('/notes')}
                    startDecorator="N"
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Notes
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="neutral"
                    onClick={() => router.push('/shapes')}
                    startDecorator="S"
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Shapes
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="warning"
                    onClick={() => router.push('/draw')}
                    startDecorator="D"
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Draw
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Advanced Features Section */}
        <Grid xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: 'md',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ mb: 2 }}>
                <Typography level="title-lg" color="primary" fontWeight="bold">
                  Advanced Features
                </Typography>
                <Divider sx={{ my: 1.5 }} />
              </Box>
              <Grid container spacing={1.5}>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="primary"
                    onClick={() => router.push('/connector')}
                    startDecorator="C"
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Connector
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="success"
                    onClick={() => router.push('/align')}
                    startDecorator="A"
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Alignment
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="neutral"
                    onClick={() => router.push('/crop-demo')}
                    startDecorator="I"
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Image Crop
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="warning"
                    onClick={() => router.push('/markdown')}
                    startDecorator="M"
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Markdown
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Documentation Section */}
        <Grid xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: 'md',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ mb: 2 }}>
                <Typography level="title-lg" color="primary" fontWeight="bold">
                  Documentation & Examples
                </Typography>
                <Divider sx={{ my: 1.5 }} />
              </Box>
              <Grid container spacing={1.5}>
                <Grid xs={12}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="primary"
                    onClick={() => router.push('/connector-docs')}
                    sx={{ justifyContent: 'center', py: 1.5, mb: 1 }}
                  >
                    XConnector Documentation
                  </Button>
                </Grid>
                <Grid xs={12}>
                  <Button
                    fullWidth
                    variant="soft"
                    color="success"
                    onClick={() => router.push('/connector-demo')}
                    sx={{ justifyContent: 'center', py: 1.5 }}
                  >
                    Interactive Connector Demo
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Featured Demo Section */}
      <Typography
        level="h2"
        sx={{
          mb: 4,
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#1e293b',
          position: 'relative',
        }}
      >
        <Box
          component="span"
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '10%',
              width: '80%',
              height: '4px',
              background: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
              borderRadius: '2px',
            },
          }}
        >
          Featured Demos
        </Box>
      </Typography>

      <Grid container spacing={3}>
        {featuredDemos.map((demo, index) => (
          <Grid xs={12} sm={6} md={4} key={index}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: 'md',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardOverflow>
                <AspectRatio ratio="16/9" sx={{ minHeight: '160px' }}>
                  <Box
                    sx={{
                      background: demo.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      level="h3"
                      sx={{ color: 'white', fontSize: '1.5rem' }}
                    >
                      {demo.icon} {demo.title}
                    </Typography>
                  </Box>
                </AspectRatio>
              </CardOverflow>

              <CardContent sx={{ p: 2, pb: 1 }}>
                <Box sx={{ mb: 1.5 }}>
                  {demo.tags.map((tag, i) => (
                    <Chip
                      size="sm"
                      variant="soft"
                      color={tag.color}
                      sx={{ mr: 0.5, mb: 0.5 }}
                      key={i}
                    >
                      {tag.label}
                    </Chip>
                  ))}
                </Box>
                <Typography level="body-sm" sx={{ mb: 2 }}>
                  {demo.description}
                </Typography>
              </CardContent>

              <CardOverflow
                sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider' }}
              >
                <Button
                  fullWidth
                  variant="solid"
                  color="primary"
                  onClick={() => router.push(demo.path)}
                >
                  Explore Demo
                </Button>
              </CardOverflow>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 8,
          py: 4,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography level="body-sm" sx={{ mb: 1, color: 'text.secondary' }}>
          CanvasX — A powerful canvas-based UI component library
        </Typography>
        <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
          © {new Date().getFullYear()} Boardxus. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

// Featured demo data
const featuredDemos = [
  {
    title: 'Interactive Flowchart',
    icon: '📊',
    description:
      'Create complex flowcharts with interactive connectors and shapes, perfect for diagramming processes and workflows.',
    tags: [
      { label: 'Connectors', color: 'primary' },
      { label: 'Shapes', color: 'success' },
      { label: 'Interactive', color: 'neutral' },
    ],
    path: '/alldemos',
    gradient: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
  },
  {
    title: 'Note Board',
    icon: '📝',
    description:
      'Organize ideas and information with draggable, resizable sticky notes in various colors and shapes.',
    tags: [
      { label: 'Notes', color: 'warning' },
      { label: 'Draggable', color: 'success' },
      { label: 'Colorful', color: 'danger' },
    ],
    path: '/notes',
    gradient: 'linear-gradient(to right, #FF8008, #FFC837)',
  },
  {
    title: 'Shape Gallery',
    icon: '🔷',
    description:
      'Explore various shapes and paths with customizable properties, perfect for creating visual elements.',
    tags: [
      { label: 'Shapes', color: 'primary' },
      { label: 'Paths', color: 'success' },
      { label: 'Customizable', color: 'neutral' },
    ],
    path: '/shapes',
    gradient: 'linear-gradient(to right, #1D976C, #93F9B9)',
  },
];

export default Homepage;
