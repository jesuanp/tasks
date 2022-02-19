import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTIALIZAR_TAREA,
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case TAREAS_PROYECTO: return {
            ...state,
            tareasproyectos: action.payload
        }

        case AGREGAR_TAREA: return {
            ...state,
            tareasproyectos: [...state.tareasproyectos, action.payload],
            errortarea: false
        }

        case VALIDAR_TAREA: return {
            ...state,
            errortarea: true
        }

        case ELIMINAR_TAREA: return {
            ...state,
            tareasproyectos: state.tareasproyectos.filter(t => t._id !== action.payload)
        }

        case ACTIALIZAR_TAREA:
        case ESTADO_TAREA: return {
            ...state,
            tareasproyectos: state.tareasproyectos.map(t => t._id === action.payload._id ? action.payload : t),
            tareaseleccionada: null
        }

        case TAREA_ACTUAL: return {
            ...state,
            tareaseleccionada: action.payload
        }

        default: return state
    }
}