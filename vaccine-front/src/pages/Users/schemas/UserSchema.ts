import * as yup from "yup"

import { User } from "../types/User"

export const UserSchema = yup
  .object<User>({
    fullName: yup.string().required("Este campo é obrigatório"),
    document: yup.string().required("Este campo é obrigatório"),
    birthDate: yup.date().required("Este campo é obrigatório"),
    mobile: yup.string().required("Este campo é obrigatório"),
    responsible: yup.string().required("Este campo é obrigatório"),
  })
  .required()
