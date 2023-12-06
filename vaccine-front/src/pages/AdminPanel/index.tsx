import { Button, Container, Grid, Typography, Paper, Avatar } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
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
  
  const navigateToPacientReport = () => {
    navigate('/login/adminPanel/pacientReport');
  };

  const administratorImageUrl = 'https://conteudo.imguol.com.br/c/entretenimento/2d/2018/11/12/stan-lee-1542063577369_v2_450x450.jpg'

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Avatar alt="Administrator" src={administratorImageUrl} sx={{ width: 100, height: 100, marginBottom: '20px' }} />
        <Typography variant="h4" align="left" style={{ marginBottom: '15px' }}>
          Bem vindo Dr. Stan Lee
          <ArrowDropDownIcon style={{ fontSize: '2rem' }} />
        </Typography>
        <Typography variant="h7" align="left" style={{ marginBottom: '20px' }}>
          drstanlee@gov.br
        </Typography>
        <div>
        <Button variant="contained" color="primary" style={{ marginRight: '10px', marginTop: '20px' }}>
          Conta
        </Button>
        <Button variant="contained" color="primary" style={{ marginRight: '10px', marginTop: '20px' }}>
          Logout
        </Button>
        </div>
      </Paper>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '20px', fontSize: '1.5rem', marginTop: '40px' }}
            onClick={navigateToPatients}
          >
            <PeopleIcon style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <Typography variant="h4">Pacientes</Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '20px', fontSize: '1.5rem' }}
            onClick={navigateToPacientReport}
          >
            <AssignmentIndIcon style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <Typography variant="h4">Ficha do Paciente</Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '20px', fontSize: '1.5rem' }}
            onClick={navigateToVaccinesRegistry}
          >
            <LocalHospitalIcon style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <Typography variant="h4">Aplicação de Vacinas</Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '20px', fontSize: '1.5rem' }}
            onClick={navigateToVaccines}
          >
            <AssignmentIcon style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <Typography variant="h4">Registro de Vacinas</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPanel;
