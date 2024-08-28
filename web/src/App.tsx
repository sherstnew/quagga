import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Panel from './pages/Panel/Panel';
import QRLink from './pages/QrLink/QRLink';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/panel' element={<Panel />} />
        <Route path='/qr/:panelId' element={<QRLink />} />
      </Routes>
    </BrowserRouter>
  )
}