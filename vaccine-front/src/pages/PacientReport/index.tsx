import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper} from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const renderStatus = (patient, vaccine, vaccinesRegistry) => {
    const doses = vaccine.doses || 'UNICA'
    let counterDose = 0
    let isLate

    vaccinesRegistry.map((registry) => {
        if (registry.childName === patient.name && registry.vaccineName === vaccine.name) {
            counterDose += 1;
        }
      });
    
}

const renderDoses = (childName, vaccine, vaccinesRegistry) => {
    const doses = vaccine.doses || 'UNICA';
    let counterDose = 0;
  
    vaccinesRegistry.map((registry) => {
      if (registry.childName === childName && registry.vaccineName === vaccine.name) {
        counterDose += 1;
      }
    });
  
    const dosesArray = Array.from({ length: doses === 'UNICA' ? 1 : doses }, (_, index) => index + 1);
  
    return dosesArray.map((doseNumber) => {
      const isDoseTaken = counterDose >= doseNumber;
  
      const dotStyle = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '4px',
        backgroundColor: isDoseTaken ? 'green' : 'red',
      };
  
      return (
        <span key={doseNumber} style={dotStyle}>
          {isDoseTaken}
        </span>
      );
    });
  };  

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function PacientReport() {
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
    const [vaccines, setVaccines] = useState([])
    const [vaccinesRegistry, setVaccineRegistry] = useState([])
    const [patients, setPatients] = useState([])
    const classes = useStyles();

  const handleClick=(e: { preventDefault: () => void; })=>{
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
    <Paper elevation={1} style={paperStyle}>
    <h1 style={{ color: "blue", textDecorationLine: "none" }}>Ficha do Paciente</h1>
    {patients.map((patient) => (
        <Paper elevation={6} style={paperStyle} key={patient.id}>
          <Typography variant="h6">Nome: {patient.name}</Typography>
          <Typography variant="body1">Responsável: {patient.responsible}</Typography>
          <Typography variant="body1">Data de Nascimento: {patient.birthDate}</Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vacina</TableCell>
                  <TableCell>Doses</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vaccines.map((vaccine) => (
                  <TableRow key={vaccine}>
                    <TableCell>{vaccine.name + ' ' + vaccine.subtipo}</TableCell>
                    <TableCell>{renderDoses(patient.name, vaccine, vaccinesRegistry)}</TableCell>
                    <TableCell>{renderDoses(patient, vaccine, vaccinesRegistry)}</TableCell>
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
