import React, {useContext} from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/tareaContext";
// import {CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext)
    const {proyecto, eliminarProyecto} = proyectosContext;
    
    const tareasContext = useContext(TareaContext)
    const {tareasproyectos} = tareasContext;
    
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    const [proyectoActual] = proyecto;


    return (
        <>
            <h2>Proyecto: {proyectoActual && proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {
                    tareasproyectos.length === 0
                    ? <li className="tarea"><p>No hay tareas</p></li>
                    : tareasproyectos.map((t, i) => (
                        <Tarea
                            key={t._id}
                            tarea={t}
                        />
                    ))
                }
            </ul>

            <button 
                className="btn btn-eliminar"
                onClick={()=>eliminarProyecto(proyectoActual._id)}
            >Eliminar proyecto &times;</button>

        </>
    )
}

export default ListadoTareas;
