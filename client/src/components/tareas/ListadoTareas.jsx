import React, {useContext} from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/ProyectoContext";


const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext)
    const {proyecto, eliminarProyecto} = proyectosContext;

    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    const [proyectoActual] = proyecto;

    const tareasProyecto = [
        {nombre: "elegir plataformas de pago", estado: true},
        {nombre: "agregar carrito", estado: false},
        {nombre: "añadir los preductos", estado: false},
        {nombre: "ver eventos", estado: true},
    ]

    return (
        <>
            <h2>Proyecto: {proyectoActual && proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {
                    tareasProyecto.length === 0
                    ? <li className="tarea"><p>No hay tareas</p></li>
                    : tareasProyecto.map(t => (
                        <Tarea
                            tarea={t}
                        />
                    ))
                }
            </ul>

            <button 
                className="btn btn-eliminar"
                onClick={()=>eliminarProyecto(proyectoActual.id)}
            >Eliminar proyecto &times;</button>

        </>
    )
}

export default ListadoTareas;
