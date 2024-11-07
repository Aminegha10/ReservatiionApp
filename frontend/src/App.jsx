import { Route, Routes } from "react-router-dom"
import CreateCreneau from "./pages/creneaux/CreateCreneau"
import Home from "./pages/creneaux/Home"
import UpdateCreneau from "./pages/creneaux/UpdateCreneau"
import DeleteCreneau from "./pages/creneaux/DeleteCreneau"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
       <Route path="/creneaux/create" element={<CreateCreneau />} />
       <Route path="/creneaux/update/:id" element={<UpdateCreneau />} />
       <Route path="/creneaux/delete/:id" element={<DeleteCreneau/>}/>
    </Routes>
  )
}
export default App
