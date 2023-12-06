import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, FormControl} from '@material-ui/core';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PopUp from '../../components/PopUp';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

function formatForm(patients, vaccineRegistryForm) {
  const newVaccineRegistryForm = {
    "document": "",
    "date": "",
    "childName": "",
    "doctor": "",
    "unidade": "",
    "vaccineName": ""
  }
  patients.forEach((patient) => {
    if (patient.name === vaccineRegistryForm.childName) {
      newVaccineRegistryForm.document = patient.document;
      const formattedDate = vaccineRegistryForm.date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      newVaccineRegistryForm.date = formattedDate;
      newVaccineRegistryForm.childName = patient.name;
      newVaccineRegistryForm.doctor = vaccineRegistryForm.doctor;
      newVaccineRegistryForm.unidade = vaccineRegistryForm.unidade;
      newVaccineRegistryForm.vaccineName = vaccineRegistryForm.vaccineName;
    }
  });

  console.log(vaccineRegistryForm)
  return newVaccineRegistryForm
}

export default function VaccineRegistry() {
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
    const[childName,setChildName]=useState('')
    const[vaccineName,setVaccine]=useState('')
    const[date,setDate]=useState(null)
    const[unidade,setUnidade]=useState('')
    const[doctor,setDoctor]=useState('')
    const [vaccines, setVaccines] = useState([])
    const [vaccinesRegistry, setVaccineRegistry] = useState([])
    const [patients, setPatients] = useState([])
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const classes = useStyles()

  const clearValues = () => {
      setChildName('');
      setDate(null);
      setDoctor('');
      setUnidade('');
      setVaccine('');
    }

  const handleClick=(e: { preventDefault: () => void; })=>{
    e.preventDefault()
    const vaccineRegistryForm = {
      childName,
      date,
      doctor,
      unidade,
      vaccineName
    }
    const formattedForm = formatForm(patients, vaccineRegistryForm)
    fetch("http://localhost:8090/vaccineRegistry/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formattedForm)

  }).then(()=>{
    console.log("Aplicação de Vacina Registrada com Sucesso!")
  })
  setShowSuccessPopup(true)
  clearValues()
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
      <InputLabel id="test-select-label">Pacientes</InputLabel>
      <Select
          value={childName}
          onChange={(e)=>setChildName(e.target.value)}
          variant="outlined"
          style={{ width: '95%' }}
          labelId="test-select-label"
          label={"Label"}
        >
          {patients.map((patient) => (
            <MenuItem key={patient.id} value={patient.name}>
              {patient.name}
            </MenuItem>
          ))}
        </Select>
      <InputLabel id="test-select-label">Vacina</InputLabel>
      <Select
          value={vaccineName}
          onChange={(e)=>setVaccine(e.target.value)}
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
      onChange={(newDate) => setDate(newDate)}
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
          <Typography variant="h6">{vac.childName}</Typography>
          <Typography variant="body1">Última Vacina: {vac.vaccineName}</Typography>
          <Typography variant="body1">Data da Aplicação: {vac.date}</Typography>
          <Typography variant="body1">Responsável Técnico: {vac.doctor}</Typography>
        </Paper>
      ))}
    </Paper>
    {showSuccessPopup && <PopUp dialog='Aplicação de vacina registrada com sucesso!'/>} 
    </Container>
  );
}
