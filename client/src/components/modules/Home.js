import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from '@mui/material';

const Home = ({ onLogout }) => {
  return (
    <div>
      <Container sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Hello, User! Explore your options below:
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                '&:hover': { boxShadow: 6, transform: 'scale(1.05)' },
                transition: 'transform 0.2s ease-in-out',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profile
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and edit your profile information.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                '&:hover': { boxShadow: 6, transform: 'scale(1.05)' },
                transition: 'transform 0.2s ease-in-out',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Settings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your account and preferences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                '&:hover': { boxShadow: 6, transform: 'scale(1.05)' },
                transition: 'transform 0.2s ease-in-out',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reports
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access your activity and insights reports.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
