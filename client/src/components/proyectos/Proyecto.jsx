import React, {useContext} from "react";
import proyectoContext from "../../context/proyectos/ProyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({proyecto}) => {

    //Obtener el state del proyecto
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;
    
    //obtener la función del contexto de tareas
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;
    

    //función para agregar el proyecto actual
    const seleccionarProyecto = (id)  => {
        proyectoActual(id);
        obtenerTareas(id);
    };

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=>seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    )
}

export default Proyecto;