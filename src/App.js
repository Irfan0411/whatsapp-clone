import '@ionic/react/css/core.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import './style.css'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {currentUser} = useContext(AuthContext); 
  const ProtectRoute = ({children})=>{
    if(!currentUser) {
      return <Navigate to="/login" />
    } else {
      return children
    }
  } 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectRoute>
            <Home/>
          </ProtectRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
