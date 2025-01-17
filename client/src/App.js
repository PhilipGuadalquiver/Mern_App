import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Home from './components/modules/Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Capstone App
            </Typography>
            {!isLoggedIn ? (
              <>
                <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                <Button color="inherit" component={Link} to="/login">Log In</Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout} component={Link} to="/login">
                Log Out
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/home"
            element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
