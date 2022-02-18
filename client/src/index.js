import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from "./context/alertas/AlertaState";
import AuthState from "./context/autenticacion/authState";
import AuthContext from "./context/autenticacion/authContext";

ReactDOM.render(
  <React.StrictMode>
    <ProyectoState>
        <TareaState>
            <AlertaState>
                <AuthState>

                  <App />
                  
                </AuthState>
            </AlertaState>
        </TareaState>
    </ProyectoState>
  </React.StrictMode>,
  document.getElementById('root')
);
