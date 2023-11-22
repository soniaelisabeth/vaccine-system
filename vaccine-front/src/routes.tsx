import { Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import UserCreate from "./pages/Users/Create"
import UserEdit from "./pages/Users/Edit"
import UserList from "./pages/Users/List"
import Appbar from "./pages/Appbar"
import Login from "./pages/Login"
import VaccineLog from "./pages/VaccineLog"
import AdminPanel from "./pages/AdminPanel"

export function AppRoutes() {
  return (
    <><Appbar />
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users">
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserCreate />} />
        <Route path="/users/:id" element={<UserEdit />} />
      </Route>
      <Route path="/login">
        <Route path="/login" element={<Login />} />
        <Route path="/login/adminPanel" element={<AdminPanel />} />
        <Route path="/login/adminPanel/vaccineLog" element={<VaccineLog />} />
      </Route>
    </Routes></>
  )
}
