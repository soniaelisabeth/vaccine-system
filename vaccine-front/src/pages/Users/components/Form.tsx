import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import InputMask from "react-input-mask"
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts"

import { UserSchema } from "../schemas/UserSchema"

import { User } from "../types/User"
import PopUp from "../../../components/PopUp"

export default function Form() {
  const [users, setUsers] = useLocalStorage<User[]>("users", [])
  const { id } = useParams()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>({
    resolver: yupResolver(UserSchema),
  })

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (!id) return

    const user = users.find((user) => user.id === id)

    if (!user) return

    setValue("fullName", user.fullName)
    setValue("document", user.document)
    setValue("birthDate", new Date(user.birthDate))
    setValue("mobile", user.mobile)
    setValue("responsible", user.responsible)
  }, [id, setValue, users])

  const onSubmit = (data: User) => {
    if (!id) {
      setUsers([...users, { ...data, id: `${users.length + 1}` }])
    } else {
      const newUsers = [...users]
      const userIndex = users.findIndex((user) => user.id === id)
      newUsers[userIndex] = { ...data, id }

      setUsers(newUsers)
    }
    
    updateDb(data)
    setShowSuccessPopup(true)
    clearValues()
  }

  const updateDb = (data: User) => {
    const formattedDate = data.birthDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    let newData = data
    newData.birthDate = formattedDate

    console.log(data)
    fetch("http://localhost:8090/patient/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(newData)

  }).then(()=>{
    console.log("Paciente Registrado com Sucesso!")
  })
  }

  const clearValues = () => {
    setValue('fullName', '');
    setValue('document', '');
    setValue('birthDate', null);
    setValue('mobile', '');
    setValue('responsible', '');
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 2 }}
    >
      <TextField
        label="Nome Completo"
        fullWidth={true}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        sx={{ marginBottom: 2 }}
        {...register("fullName")}
      />
    
      <TextField
        label="Nome do Responsável"
        fullWidth={true}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        sx={{ marginBottom: 2 }}
        {...register("responsible")}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ marginBottom: 2 }}
      >
        <Controller
          control={control}
          name="document"
          defaultValue=""
          render={({ field: { ...field } }) => (
            <FormControl fullWidth={true}>
              <InputMask mask="999.999.999-99" {...field}>
                <TextField
                  label="CPF"
                  fullWidth={true}
                  error={!!errors.document}
                  helperText={errors.document?.message}
                />
              </InputMask>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="birthDate"
          render={({ field: { ...field } }) => (
            <FormControl fullWidth={true}>
              <DatePicker label="Data de Nascimento" {...field} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="mobile"
          defaultValue=""
          render={({ field: { ...field } }) => (
            <FormControl fullWidth={true}>
              <InputMask mask="(99) 99999-9999" {...field}>
                <TextField
                  label="WhatsApp do responsável"
                  fullWidth={true}
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              </InputMask>
            </FormControl>
          )}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button type="submit" variant="contained" size="large">
          Criar Usuário
        </Button>
        <Button onClick={clearValues}>
          Cancelar
        </Button>
      </Stack>
    {showSuccessPopup && <PopUp />}
    </Box>
  )
}
