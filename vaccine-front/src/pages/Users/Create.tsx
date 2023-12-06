import { Paper, Stack } from "@mui/material"

import Breadcrumbs from "../../components/Breadcrumbs"
import PageTitle from "../../components/PageTitle"

import Form from "./components/Form"

export default function Create() {
  return (
    <>
      <Stack sx={{ marginBottom: 2 }}>
        <div style={{ marginTop: '10px' }}>
          <PageTitle title="Criar Novo Usuário" />
        </div>
        <Breadcrumbs
          path={[{ label: "Pacientes", to: "/users/" }, { label: "Novo" }]}
        />
      </Stack>
      <Paper>
        <Form />
      </Paper>
    </>
  )
}
