import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import PetDetail from './pages/PetDetail';
import Formulario from './pages/Formulario';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Animais from './pages/admin/Animais';

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/catalogo"       element={<Catalogo />} />
        <Route path="/pet/:id"        element={<PetDetail />} />
        <Route path="/adotar"         element={<Formulario />} />
        <Route path="/admin/login"    element={<Login />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/animais"  element={<PrivateRoute><Animais /></PrivateRoute>} />
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
