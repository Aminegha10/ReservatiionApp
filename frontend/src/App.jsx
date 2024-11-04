import { Route, Routes } from "react-router-dom"
import CreateCreneaux from "./pages/creneaux/CreateCreneaux"
import Home from "./pages/creneaux/Home"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
       <Route path="/creneux/create" element={<CreateCreneaux />} />
    </Routes>
  )
}
export default App
