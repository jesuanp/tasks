import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Proyectos from './components/proyectos/Proyectos';
import NuevaCuenta from "./components/auth/NuevaCuenta";

import ProyectoState from './context/proyectos/proyectoState'

function App() {
  return (
    <div className="App">
      <ProyectoState>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/nueva-cuenta' element={<NuevaCuenta/>} />
            <Route path='/proyectos' element={<Proyectos/>} />
          </Routes>
        </Router>
      </ProyectoState>
    </div>
  );
}

export default App;
