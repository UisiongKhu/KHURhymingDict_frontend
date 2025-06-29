import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/main.css'
import Homepage from './pages/Homepage'
import Contact from './pages/Contact'
import Rhymes from './pages/Rhymes'
import SimpleSearch from './pages/SimpleSearch'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}></Route>
        <Route path='chonglam' element={<Rhymes/>}></Route>
        <Route path='search' element={<SimpleSearch/>}></Route>
        <Route path='contactUs' element={<Contact/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
