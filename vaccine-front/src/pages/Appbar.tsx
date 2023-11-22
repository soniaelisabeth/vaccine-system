import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [_, setCurrentPage] = React.useState('home');

  const handleNavigation = (page: React.SetStateAction<string>) => {
    setCurrentPage(page);
    switch (page) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'signin':
        navigate('/users/new')
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Carteira de Vacinação
          </Typography>

          {/* Home Icon */}
          <IconButton color="inherit" aria-label="home" onClick={() => handleNavigation('dashboard')}>
            <HomeIcon />
          </IconButton>

          {/* Vaccine Log Icon */}
          <IconButton color="inherit" aria-label="login" onClick={() => handleNavigation('login')}>
            <VaccinesIcon />
          </IconButton>
          
          <IconButton color="inherit" aria-label="login" onClick={() => handleNavigation('signin')}>
            <LoginIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
