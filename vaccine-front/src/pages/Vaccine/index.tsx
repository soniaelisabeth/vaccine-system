import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button} from '@material-ui/core';
import { Typography } from '@mui/material';
import PopUp from '../../components/PopUp';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Vaccine() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[subtipo,setSubtipo]=useState('')
    const[idade,setIdade]=useState('')
    const[doses,setDoses]=useState('')
    const[intervaloEntreDoses,setIntervaloEntreDoses]=useState('')
    const [vaccines, setVaccines] = useState([])
    const classes = useStyles();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const clearValues = () => {
    setName('');
    setSubtipo('');
    setIdade('');
    setDoses('');
    setIntervaloEntreDoses('');
  }
  const handleClick=(e: { preventDefault: () => void; })=>{
    e.preventDefault()
    const vaccineForm = {
      doses,
      subtipo,
      intervaloEntreDoses,
      name,
      idade
    }
    console.log(vaccineForm)
    fetch("http://localhost:8090/vaccine/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(vaccineForm)

  }).then(()=>{
    console.log("Vacina Registrada com Sucesso!")
  })
  setShowSuccessPopup(true)
  clearValues()
}

useEffect(()=>{
  fetch("http://localhost:8090/vaccine/getAll")
  .then(res=>res.json())
  .then((result)=>{
    console.log(result)
    setVaccines(result)
  }
)
},[])

  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "black", textDecorationLine: "none" }}>Registro de Vacinas</h1>

    <form className={classes.root} autoComplete="off">
    
      <TextField id="outlined-basic" label="Nome da Vacina" variant="outlined" style={{width: '95%'}} 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Subtipo" variant="outlined" style={{width: '95%'}}
      value={subtipo}
      onChange={(e)=>setSubtipo(e.target.value)}
      />
      <TextField id="outlined-basic" label="Idade" variant="outlined" style={{width: '95%'}}
      value={idade}
      onChange={(e)=>setIdade(e.target.value)}
      />
      <TextField id="outlined-basic" label="Doses" variant="outlined" style={{width: '95%'}}
      value={doses}
      onChange={(e)=>setDoses(e.target.value)}
      />
      <TextField id="outlined-basic" label="Intervalo Entre Doses" variant="outlined" style={{width: '95%'}}
      value={intervaloEntreDoses}
      onChange={(e)=>setIntervaloEntreDoses(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Registrar
      </Button>
    </form>
   
    </Paper>

    <Paper elevation={1} style={paperStyle}>
    <h1 style={{ color: "black", textDecorationLine: "none" }}>Vacinas Cadastradas</h1>
    {vaccines.map((vac) => (
        <Paper elevation={6} style={paperStyle} key={vac.id.toString()}>
          <Typography variant="h6">Vacina: {vac.name}</Typography>
          <Typography variant="h6">Subtipo: {vac.subtipo}</Typography>
          <Typography variant="body1">Idade: {vac.idade}</Typography>
          <Typography variant="body1">Doses: {vac.doses}</Typography>
          <Typography variant="body1">Intervalo Entre Doses: {vac.intervaloEntreDoses}</Typography>
        </Paper>
      ))}
    </Paper>
    {showSuccessPopup && <PopUp dialog='Nova vacina registrada com sucesso!'/>} 
    </Container>
  );
}
