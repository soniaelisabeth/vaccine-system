import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import { Box, Button, Paper, Stack } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

import Breadcrumbs from "../../components/Breadcrumbs"
import PageTitle from "../../components/PageTitle"

import Grid from "./components/Grid"

export default function List() {
  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1 }}>
          <div style={{ marginTop: '10px' }}>
            <PageTitle title="Pacientes Cadastrados"/>
          </div>
          <Breadcrumbs
            path={[{ label: "Pacientes", to: "/users" }, { label: "Pacientes Cadastrados" }]}
          />
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <div style={{ marginTop: '65px' }}>
            <Button
              component={RouterLink}
              to="/users/new"
              variant="contained"
              startIcon={<PersonAddAltIcon />}
            >
              Novo Usuário
            </Button>
          </div>
        </Box>
      </Stack>
      <Paper>
        <Grid />
      </Paper>
    </>
  )
}
