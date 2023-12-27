import Navigation from './components/header/navigation/Navigation';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Recepten from './pages/recepten/Recepten';
import Account from './pages/account/Account';
import Login from './pages/account/Login';
import Logout from './pages/account/Logout';
import Register from './pages/account/Register';
import OverOns from './pages/over-ons/Over-ons';
import NotFound from './pages/not_found/Not-found';
import AuthContextProvider from './context/Auth';
import './App.css'

function App() {
  return (
    <>
    <AuthContextProvider>
      <Navigation />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recepten" element={<Recepten />} />
          <Route path="/over-ons" element={<OverOns />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registreren" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      </AuthContextProvider>
    </>
  )
}

export default App
