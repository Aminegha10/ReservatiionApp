import { Route, Routes } from "react-router-dom"
import CreateCreneau from "./pages/creneaux/CreateCreneau"
import GetAllCreneaux from "./pages/creneaux/GetAllCreneaux"
import UpdateCreneau from "./pages/creneaux/UpdateCreneau"
import DeleteCreneau from "./pages/creneaux/DeleteCreneau"
import GetAllPrestataires from "./pages/prestataires/GetAllPrestataires"

function App() {
  return (
    <Routes>
      <Route path="/creneaux" element={<GetAllCreneaux/>}/>
      <Route path="/creneaux/create" element={<CreateCreneau />} />
      <Route path="/creneaux/update/:id" element={<UpdateCreneau />} />
      <Route path="/creneaux/delete/:id" element={<DeleteCreneau/>}/>

      <Route path="/prestataires" element={<GetAllPrestataires/>}/>
    </Routes>
  )
}
export default App
