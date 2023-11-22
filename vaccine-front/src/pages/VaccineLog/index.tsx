import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button} from '@material-ui/core';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const vaccinesList = [
  "BCG ",
  "Hepatite B",
  "Poliomielite",
  "Febre Amarela",
  "Hepatite A",
  "Varicela",
]

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Patient() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[document,setDocument]=useState('')
    const[vaccineName,setVaccine]=useState('')
    const[date,setDate]=useState('')
    const[lote,setLote]=useState('')
    const[unidade,setUnidade]=useState('')
    const[doctor,setDoctor]=useState('')
    const [vaccines, setVaccines] = useState([])
    const classes = useStyles();

  const handleClick=(e: { preventDefault: () => void; })=>{
    e.preventDefault()
    const vaccineForm = {
      date,
      doctor,
      document,
      lote,
      name,
      unidade,
      vaccineName
    }
    console.log(vaccineForm)
    fetch("http://localhost:8090/vaccine/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(vaccineForm)

  }).then(()=>{
    console.log("Vacina Registrada com Sucesso!")
  })
}

useEffect(()=>{
  fetch("http://localhost:8090/vaccine/getAll")
  .then(res=>res.json())
  .then((result)=>{
    console.log(result)
    const appliedVaccines = new Map()
    for (result.vaccine of vaccinesList) {
      if (vaccinesList.includes(result.vaccine)) {
        appliedVaccines.set(result.vaccine, true)
      }
    }
    console.log(appliedVaccines)
    setVaccines(result)
  }
)
},[])

  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue", textDecorationLine: "none" }}>Registro de Vacinas</h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Nome do Paciente" variant="outlined" style={{width: '95%'}} 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Documento do Paciente" variant="outlined" style={{width: '95%'}}
      value={document}
      onChange={(e)=>setDocument(e.target.value)}
      />
      <TextField id="outlined-basic" label="Vacina" variant="outlined" style={{width: '95%'}}
      value={vaccineName}
      onChange={(e)=>setVaccine(e.target.value)}
      />
      <div>
      <DatePicker label="Data"
      value={date}
      onChange={(newDate) => setDate(format(newDate, 'dd/MM/yyyy'))}
      />
      </div>
      <TextField id="outlined-basic" label="Lote" variant="outlined" style={{width: '95%'}}
      value={lote}
      onChange={(e)=>setLote(e.target.value)}
      />
      <TextField id="outlined-basic" label="Unidade" variant="outlined" style={{width: '95%'}}
      value={unidade}
      onChange={(e)=>setUnidade(e.target.value)}
      />
      <TextField id="outlined-basic" label="Responsável Técnico" variant="outlined" style={{width: '95%'}}
      value={doctor}
      onChange={(e)=>setDoctor(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Registrar
      </Button>
    </form>
   
    </Paper>

    <Paper elevation={1} style={paperStyle}>
    <h1 style={{ color: "blue", textDecorationLine: "none" }}>Pacientes</h1>
    {vaccines.map((vac) => (
        <Paper elevation={6} style={paperStyle} key={vac.id}>
          <Typography variant="h6">Nome: {vac.name}</Typography>
          <Typography variant="body1">Última Vacina: {vac.vaccineName}</Typography>
          <Typography variant="body1">Data: {vac.date}</Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vacina</TableCell>
                  <TableCell>Aplicada</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vaccinesList.map((vaccine) => (
                  <TableRow key={vaccine}>
                    <TableCell>{vaccine}</TableCell>
                    <TableCell>{vaccine.includes(vac.vaccineName) ? (
                      <span style={{color: "green"}}>Aplicada</span>
                    ) : (
                      <span style={{color: "red"}}>Não Aplicada</span>
                    )}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Paper>
    </Container>
  );
}
