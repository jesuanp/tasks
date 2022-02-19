import React, {useContext} from "react";
import proyectoContext from "../../context/proyectos/ProyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({tarea}) => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

    const tareaEliminar = id => {
        eliminarTarea(id, proyecto[0]._id);
        obtenerTareas(proyecto[0]._id);
    };

    const cambiarEstado = tarea => {
        console.log('antes: ', tarea.estado);
        tarea.estado = !tarea.estado;
        console.log('despues: ', tarea.estado);

        actualizarTarea(tarea)
    };

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    };

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {
                    tarea.estado
                    ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={()=>cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    :
                        (
                            <button
                                type="button"
                                className="imcompleto"
                                onClick={()=>cambiarEstado(tarea)}
                            >Imcompleto</button>
                        )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=>seleccionarTarea(tarea)}
                >Editar</button>
                
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    );
}

export default Tarea;
