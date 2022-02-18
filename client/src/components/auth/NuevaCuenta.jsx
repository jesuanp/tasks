import React, {useState, useContext, useEffect} from "react";
import {NavLink, useNavigate} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {

    const history = useNavigate()

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    useEffect(()=>{
        if(autenticado){
            history('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, history]);

    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: ""
    });

    const {nombre, email, password, confirmar} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //Validar que no haya campos vacios
        if(nombre.trim() === '' || 
        email.trim() === '' || 
        password.trim() === '' || confirmar.trim() === ''){
            return mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        //password minimo de 6 caracteres
        if(password.length < 6){
            return mostrarAlerta('La contraseña debe tener al menos 6 caracteres', 'alerta-error');
        }

        //los dos password son iguales
        if(password !== confirmar){
            return mostrarAlerta('las contraseñas deben ser iguales', 'alerta-error');
        }

        registrarUsuario({nombre, email, password})
    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Una Cuenta</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

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
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Tu Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Crear Cuenta" 
                        />
                    </div>
                </form>

                <NavLink to="/" className="enlace-cuenta">
                    Iniciar Sesión
                </NavLink>

            </div>
        </div>
    );
}

export default NuevaCuenta;