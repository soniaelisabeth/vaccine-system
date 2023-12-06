import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button} from '@material-ui/core';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import InputMask from "react-input-mask"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function PacientReport() {
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
    const[childName,setChildName]=useState('')
    const[document,setDocument]=useState('')
    const[vaccineName,setVaccine]=useState('')
    const[date,setDate]=useState('')
    const[unidade,setUnidade]=useState('')
    const[doctor,setDoctor]=useState('')
    const [vaccines, setVaccines] = useState([])
    const [vaccinesRegistry, setVaccineRegistry] = useState([])
    const [patients, setPatients] = useState([])
    const classes = useStyles();

  const handleClick=(e: { preventDefault: () => void; })=>{
    e.preventDefault()
    const vaccineRegistryForm = {
      date,
      doctor,
      document,
      childName,
      unidade,
      vaccineName
    }
    console.log(vaccineRegistryForm)
    fetch("http://localhost:8090/vaccineRegistry/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(vaccineRegistryForm)

  }).then(()=>{
    console.log("Aplicação de Vacina Registrada com Sucesso!")
  })
}

useEffect(()=>{
  fetch("http://localhost:8090/vaccineRegistry/getAll")
  .then(res=>res.json())
  .then((result)=>{
    console.log(result)
    setVaccineRegistry(result)
  }
)
},[])

useEffect(()=>{
  fetch("http://localhost:8090/vaccine/getAll")
  .then(res=>res.json())
  .then((result)=>{
    console.log(result)
    setVaccines(result)
  }
)
},[])

useEffect(()=>{
  fetch("http://localhost:8090/patient/getAll")
  .then(res=>res.json())
  .then((result)=>{
    console.log(result)
    setPatients(result)
  }
)
},[])

  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue", textDecorationLine: "none" }}>Aplicação de Vacinas</h1>

    <form className={classes.root} noValidate autoComplete="off">
      <Select
          value={childName}
          onChange={(e)=>setChildName(e.target.value)}
          variant="outlined"
          style={{ width: '95%' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {patients.map((patient) => (
            <MenuItem key={patient.id} value={patient.name}>
              {patient.name}
            </MenuItem>
          ))}
        </Select>
      <TextField id="outlined-basic" label="Nome do Paciente" variant="outlined" style={{width: '95%'}} 
      value={childName}
      onChange={(e)=>setChildName(e.target.value)}
      />
      <InputMask mask="999.999.999-99">
      <TextField id="outlined-basic" label="Documento do Paciente" variant="outlined" style={{width: '95%'}}
      value={document}
      onChange={(e)=>setDocument(e.target.value)}
      />
      </InputMask>
      <TextField id="outlined-basic" label="Vacina" variant="outlined" style={{width: '95%'}}
      value={vaccineName}
      onChange={(e)=>setVaccine(e.target.value)}
      />
      <Select
          value={childName}
          onChange={(e)=>setChildName(e.target.value)}
          variant="outlined"
          style={{ width: '95%' }}
        >
          {vaccines.map((vac) => (
            <MenuItem key={vac.id} value={vac.name}>
              {vac.name + ' ' + '(' + vac.subtipo + ')'}
            </MenuItem>
          ))}
        </Select>
      <div>
      <DatePicker label="Data"
      value={date}
      onChange={(newDate) => setDate(format(newDate, 'dd/MM/yyyy'))}
      />
      </div>
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
    <h1 style={{ color: "blue", textDecorationLine: "none" }}>Vacinas Recentes</h1>
    {vaccinesRegistry.map((vac) => (
        <Paper elevation={6} style={paperStyle} key={vac.id}>
          <Typography variant="h6">Nome: {vac.childName}</Typography>
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
                {vaccines.map((vaccine) => (
                  <TableRow key={vaccine}>
                    <TableCell>{vaccine}</TableCell>
                    <TableCell>{vaccine.includes(vac.name) ? (
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
