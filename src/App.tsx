import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicView from './views/PublicView'
import BookingView from './views/BookingView'
import AdminView from './views/AdminView'

function App() {
  return (
    <BrowserRouter 
      future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}
    >
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/reservar" element={<BookingView />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
