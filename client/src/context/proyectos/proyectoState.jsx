import React, { useReducer } from "react";

import {v4 as uuidv4} from 'uuid';

import proyectoContext from "./ProyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
} from '../../types';

const ProyectoState = (props) => {

    const proyectos = [
        {id: 1, nombre: "mi web"},
        {id: 2, nombre: "ecommerce"},
        {id: 3, nombre: "diseños"}
    ]

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
    }

    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //actions
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = () => {
        return dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    const agregarProyecto = (proyecto) => {

        proyecto.id = uuidv4();

        return dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
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
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
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
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState