// AdminPanel.js
import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  const navigateToPatients = () => {
    navigate('/users');
  };

  const navigateToRegisterVaccines = () => {
    navigate('/login/adminPanel/vaccineLog');
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        {/* Patients Icon */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '20px', fontSize: '1.5rem', marginBottom: '20px' }}
            onClick={navigateToPatients}
          >
            <Typography variant="h4">Pacientes</Typography>
            <span role="img" aria-label="Patients Icon" style={{ fontSize: '2rem' }}>
            </span>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            style={{ padding: '20px', fontSize: '1.5rem' }}
            onClick={navigateToRegisterVaccines}
          >
            <Typography variant="h4">Registro de Vacinas</Typography>
            <span role="img" aria-label="Register Vaccines Icon" style={{ fontSize: '2rem' }}>
            </span>
          </Button>
        </Grid>
    </Container>
  );
};

export default AdminPanel;
