import React, {useContext} from "react";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../context/autenticacion/authContext";


const Barra = () => {

    const history = useNavigate();

    const authContext = useContext(AuthContext);
    const {usuario, cerrarSesion} = authContext;

    const handleClick = () => {
        cerrarSesion();
        history('/');
    }

    return (
        <header
            className="app-header"
        >
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span> </p> : null}

            <nav className="nav-principal">
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={handleClick}
                >Cerrar sesion</button>
            </nav>

        </header>
    )
}

export default Barra;
