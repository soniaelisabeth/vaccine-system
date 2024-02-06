import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper} from '@material-ui/core';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import WhatsAppIcon from "@mui/icons-material/WhatsApp"

const onCall = (number, message) => {
  if (!number) return;
  const cleanedNumber = number.replace(/[^\d]+/g, "");
  const whatsappLink = `https://wa.me/55${cleanedNumber}?text=${encodeURIComponent(message || 'Hello!')}`;
  window.location.href = whatsappLink;
};


const renderStatus = (patient: never, vaccine: never, vaccinesRegistry: any[]) => {
    const doses = vaccine.doses || 'UNICA'
    let counterDose = 0

    vaccinesRegistry.map((registry: { childName: any; vaccineName: any; }) => {
        if (registry.childName === patient.name && registry.vaccineName === vaccine.name) {
            counterDose += 1;
        }
      });
    
      if ((counterDose === 1 && doses === 'UNICA') || doses === counterDose) {
        return <span style={{ color: "green" }}>EM DIA</span>;
      } else if (counterDose === 0) {
        const zap = <span 
        style={{ color: "red" }}>EM ATRASO
        <IconButton
            color="success"
            size="small"
            onClick={() => onCall(
              patient.mobile,
              ' https://www.gov.br/saude/pt-br/vacinacao Está na hora da vacina do seu filho! Certifique-se de que seu filho receba a primeira dose aos 2 meses, a segunda dose aos 4 meses e a terceira dose aos 6 meses. Os intervalos entre as doses são de 60 dias, e os reforços são administrados 30 dias após a terceira dose da Penta e 30 dias após a primeira dose do reforço.'
              )}
          >
        <WhatsAppIcon fontSize="inherit" />
        </IconButton>
        </span>;

        return zap
      } else {
        return <span style={{ color: "orange" }}>PENDENTE</span>;
      }
    
    
}

const renderDoses = (childName: any, vaccine: never, vaccinesRegistry: any[]) => {
    const doses = vaccine.doses || 'UNICA';
    let counterDose = 0;
  
    vaccinesRegistry.map((registry: { childName: any; vaccineName: any; }) => {
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
    setPatients(result.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name)))
  }
)
},[])

  return (

    <Container>
    <Paper elevation={1} style={paperStyle}>
    <h1 style={{ color: "black", textDecorationLine: "none" }}>Ficha do Paciente</h1>
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
                    <TableCell>{renderStatus(patient, vaccine, vaccinesRegistry)}</TableCell>
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
