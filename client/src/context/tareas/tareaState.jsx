import React, {useReducer} from "react";
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../components/config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTIALIZAR_TAREA,
} from '../../types';

const TareaState = (props) => {

    const initialState = {
        tareasproyectos: [],
        errortarea: false,
        tareaseleccionada: null,
    };

    //Crea dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Creando las actions
    const obtenerTareas = async (proyectoId) => {
        try{
            const respuesta = await clienteAxios.get(`/api/tareas?proyecto=${proyectoId}`)
            
            dispatch({
                type: TAREAS_PROYECTO,
                payload: respuesta.data
            })
        }
        catch(err){
            console.log(err);
        }
    }

    const agregarTarea = async tarea => {

        try{

            const resultado = await clienteAxios.post('/api/tareas', tarea);

            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminar tarea por id
    const eliminarTarea = async (tareaId, proyectoId) => {
        try{

            await clienteAxios.delete(`/api/tareas/${tareaId}?proyecto=${proyectoId}`);

            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            })
        }
        catch(err){
            console.log(err)
        }
    }

    //cambiando el estado de la tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    //editar tarea actual
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //actualiza la tarea seleccionada
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTIALIZAR_TAREA,
            payload: tarea
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                obtenerTareas,

                tareasproyectos: state.tareasproyectos,

                agregarTarea,
                eliminarTarea,

                errortarea: state.errortarea,
                validarTarea,

                cambiarEstadoTarea,

                tareaseleccionada: state.tareaseleccionada,
                guardarTareaActual,
                actualizarTarea,
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

};

export default TareaState;