import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import CitaDetail from './pages/CitaDetail.jsx'

function CitaDetailRoute() {
  const { id } = useParams()
  return <CitaDetail key={id} id={id} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/citas/:id" element={<CitaDetailRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
