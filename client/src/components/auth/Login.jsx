import React, {useState, useContext, useEffect} from "react";
import {NavLink, useNavigate} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from "../../context/autenticacion/authContext";

const Login = () => {

    const history = useNavigate();

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;

    useEffect(()=>{
        if(autenticado){
            history('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, history]);

    const [usuario, setUsuario] = useState({
        email: "",
        password: ""
    });

    const {email, password} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //Validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        iniciarSesion({email, password})
    }

    return (
        <div className="form-usuario">

            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}

            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión" 
                        />
                    </div>
                </form>

                <NavLink to="/nueva-cuenta" className="enlace-cuenta">
                    Crear una cuenta
                </NavLink>

            </div>
        </div>
    );
}

export default Login