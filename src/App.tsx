import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/main.css'
import 'react-tooltip/dist/react-tooltip.css';
import Homepage from './pages/Homepage'
import Contact from './pages/Contact'
import Rhymes from './pages/Rhymes'
import SimpleSearch from './pages/SimpleSearch'
import Forum from './pages/Forum'
import { useEffect } from 'react';

function App() {

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const callTrackVisitAPI = async () => {
    try {
      await fetch(`${apiUrl}/visitorLog`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  };

  useEffect(() => {
    const lastTimeVisited = localStorage.getItem('lastTimeVisited');
    console.log('lastTimeVisited:', lastTimeVisited);
    if (!lastTimeVisited) {
      localStorage.setItem('lastTimeVisited', new Date().toISOString());
      // And call trackVisit API
      callTrackVisitAPI();
    }else{
      // Check if more than 24 hours, then update lastTimevisited and call trackVisit API
      const lastVisitDate = new Date(lastTimeVisited);
      const now = new Date();
      const diffInMs = now.getTime() - lastVisitDate.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);
      if (diffInHours >= 24) {
        localStorage.setItem('lastTimeVisited', now.toISOString());
        // And call trackVisit API
        callTrackVisitAPI();
      }
    }
  },[]);

  return (
    <>
    <BrowserRouter >
      <Routes>
        <Route index element={<Homepage/>}></Route>
        <Route path='chonglam' element={<Rhymes/>}></Route>
        <Route path='search' element={<SimpleSearch/>}></Route>
        <Route path='contactUs' element={<Contact/>}></Route>
        <Route path='forum' element={<Forum/>}></Route>
        <Route path='*' element={<div>404 Not Found</div>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
