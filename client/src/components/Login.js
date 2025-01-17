import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Initialize the navigation function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send login request to the backend (GET request to check if user exists)
    const response = await fetch(`http://localhost:4000/api/users/login/${formData.email}`);

    if (response.ok) {
      const user = await response.json();
      
      if (user.password === formData.password) {
        alert('Login Successful!');
        onLogin(); // Update the login state in App
        navigate('/home'); // Redirect to /home
      } else {
        alert('Incorrect password. Please try again.');
      }
    } else {
      alert('User not found. Please check your email.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>Log In</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
