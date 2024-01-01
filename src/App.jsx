import Navigation from './components/header/navigation/Navigation';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Recepten from './pages/recepten/Recepten';
import Detail from './components/recipes/Detail';
import Account from './pages/account/Account';
import Login from './pages/account/Login';
import Logout from './pages/account/Logout';
import Register from './pages/account/Register';
import OverOns from './pages/over_ons/Over-ons';
import NotFound from './pages/not_found/Not-found';
import Search from './pages/search/Search';
import AuthContextProvider from './context/Auth';
import './App.css'
import Mood from './pages/mood/Mood';

function App() {
  return (
    <>
      <Navigation />
      <div className='container'>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recepten" element={<Recepten />} />
            <Route path="/recepten/detail/:id" element={<Detail />} />
            <Route path="/flavor-mood" element={<Mood />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/registreren" element={<Register />} />
            <Route path="/zoeken" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthContextProvider>
      </div>
      <Footer />
    </>
  )
}

export default App
