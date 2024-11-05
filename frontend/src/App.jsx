import { Route, Routes } from "react-router-dom"
import CreateCreneau from "./pages/creneaux/CreateCreneau"
import Home from "./pages/creneaux/Home"
import UpdateCreneau from "./pages/creneaux/UpdateCreneau"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
       <Route path="/creneaux/create" element={<CreateCreneau />} />
       <Route path="/creneaux/update" element={<UpdateCreneau />} />
    </Routes>
  )
}
export default App
