// AdminPanel.js
import { Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  const navigateToPatients = () => {
    navigate('/users');
  };

  const navigateToVaccines = () => {
    navigate('/login/adminPanel/vaccine');
  };

  const navigateToVaccinesRegistry = () => {
    navigate('/login/adminPanel/vaccineRegistry');
  };

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '20px', fontSize: '1.5rem', marginTop: '20px' }}
            onClick={navigateToPatients}
          >
            <Typography variant="h4">Pacientes</Typography>
            <span role="img" aria-label="Patients Icon" style={{ fontSize: '2rem' }}>
            </span>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '20px', fontSize: '1.5rem' }}
            onClick={navigateToVaccinesRegistry}
          >
            <Typography variant="h4">Aplicação de Vacinas</Typography>
            <span role="img" aria-label="Register Vaccines Icon" style={{ fontSize: '2rem' }}>
            </span>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '20px', fontSize: '1.5rem' }}
            onClick={navigateToVaccines}
          >
            <Typography variant="h4">Registro de Vacinas</Typography>
            <span role="img" aria-label="Apply Vaccines Icon" style={{ fontSize: '2rem' }}>
            </span>
          </Button>
        </Grid>
    </Container>
  );
};

export default AdminPanel;
