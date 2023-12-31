import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Face4Icon from '@mui/icons-material/Face4';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Login() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[children,setChildren]=useState('')
    const classes = useStyles();
    const navigate = useNavigate();

     const handleClick = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      navigate('/login/adminPanel')
    };

  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Face4Icon style={{ fontSize: '3rem', marginBottom: '10px', textAlign: 'center' }} />
        </div>
        <h1 style={{ color: "black", textDecorationLine: "none", textAlign: "center" }}>Login</h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Usuário" variant="outlined" fullWidth style={{width: '95%'}}
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Senha" variant="outlined" fullWidth style={{width: '95%'}}
      value={children}
      onChange={(e)=>setChildren(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Entrar
      </Button>
    </form>
    </Paper>
    </Container>
  );
}