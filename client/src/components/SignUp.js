import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';  // Add Axios to make HTTP requests

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null); // For handling errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to the API
      const response = await axios.post('http://localhost:4000/api/users/login', formData, {
        headers: {
          'Content-Type': 'application/json'  // Ensure the request content type is JSON
        }
      });
      alert(`Sign Up Successful! \nName: ${formData.name} \nEmail: ${formData.email}`);
    } catch (err) {
      setError(err.response?.data || "Error occurred during sign-up");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
