'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Head from 'next/head';
import { useState } from 'react';
// import Link from 'next/link';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Box, Divider, Link, List, ListItem, ListItemButton, Sheet, Typography } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';

export default function MyApp({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <title>fabric.js sandbox</title>
      </Head>
      <body>
        <div className="layout-container">
          {/* Sidebar */}
          <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <Typography level="h4">CanvasX Demo</Typography>
            </div>
            <Box component="nav" aria-label="Navigation">
              <List size="sm" sx={{ '--ListItem-radius': '8px', '--ListItem-minHeight': '42px', p: 1 }}>
                <ListItem nested>
                  <ListItemButton component={Link} href="/">
                    HOME
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/text">
                    TEXT
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/notes">
                    STICKY NOTES
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/shapes">
                    SHAPES
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/connector">
                    CONNECTOR
                  </ListItemButton>
                </ListItem>


                <ListItem nested>
                  <ListItemButton component={Link} href="/align">
                    ALIGNMENT
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/draw">
                    DRAW
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/file">
                    FILE
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/website">
                    WEBSITE
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/image">
                    IMAGE
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/viewport">
                    VIEWPORT
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/markdown">
                    MARKDOWN
                  </ListItemButton>
                </ListItem>

                <ListItem nested>
                  <ListItemButton component={Link} href="/chart">
                    CHART
                  </ListItemButton>
                </ListItem>

              </List>
            </Box>
          </aside>

          {/* Main Content */}
          <main className="content-area">
            <Navbar bg="light" style={{ borderBottom: '1px solid #e0e0e0' }}>
              <Container>
                <Button
                  variant="outline-secondary"
                  onClick={toggleSidebar}
                >
                  <MenuIcon />
                </Button>
                <Navbar.Brand className="ms-3">CanvasX Demo</Navbar.Brand>
              </Container>
            </Navbar>
            <div>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
