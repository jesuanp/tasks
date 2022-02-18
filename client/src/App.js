import React, {useContext, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Proyectos from './components/proyectos/Proyectos';
import NuevaCuenta from "./components/auth/NuevaCuenta";

import AuthContext from "./context/autenticacion/authContext";
import tokenAuth from "./components/config/tokenAuth";

// Revisar si tenemos uin token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  const authContext = useContext(AuthContext);
  const {autenticado, cargando, usuarioAutenticado} = authContext;

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return (
    <div className="App">
      {/* <ProyectoState>
        <TareaState>
          <AlertaState>
            <AuthState> */}
          
              <Router>
                <Routes>
                  <Route path='/' element={<Login/>} />
                  <Route path='/nueva-cuenta' element={<NuevaCuenta/>} />
                  <Route path='/proyectos' element={!autenticado && !cargando ? <Navigate to='/'/> : <Proyectos/>} />
                </Routes>
              </Router>

            {/* </AuthState>
          </AlertaState>
        </TareaState>
      </ProyectoState> */}
    </div>
  );
}

export default App;
