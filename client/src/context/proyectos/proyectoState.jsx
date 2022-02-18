import React, { useReducer } from "react";

import proyectoContext from "./ProyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR,
} from '../../types';
import clienteAxios from '../../components/config/axios';

const ProyectoState = (props) => {

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mansaje: null,
    }

    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //actions
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {

        try{

            const respuesta = await clienteAxios.get('/api/proyectos');

            return dispatch({
                type: OBTENER_PROYECTOS,
                payload: respuesta.data
            })
        }
        catch(err){
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const agregarProyecto = async (proyecto) => {

        try{

            const respuesta = await clienteAxios.post('/api/proyectos', proyecto);

            return dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data
            })
        }
        catch(err){
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const mostrarError = () => {
        return dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto que el usuario dio click
    const proyectoActual = (proyectoId) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Eliminar un proyecto
    const eliminarProyecto = async proyectoId => {
        
        try{

            const respuesta = await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        }
        catch(err){

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //serie de funciones para el CRUD
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                obtenerProyectos,

                formulario: state.formulario,
                mostrarFormulario,

                agregarProyecto,

                errorformulario: state.errorformulario,
                mostrarError,

                proyecto: state.proyecto,
                proyectoActual,

                eliminarProyecto,

                mensaje: state.mensaje,
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState