import React, {useContext , useEffect} from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/ProyectoContext";

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyectos, obtenerProyectos} = proyectosContext;

    //obtener los proyectos cuando carga el componente
    useEffect(()=>{
        obtenerProyectos();
    }, [])

    //revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <span>No hay proyectos, comienza creando uno</span>;

    return (
        <ul className="listado-proyectos">
            {
                proyectos && proyectos.map(p => (
                    <Proyecto
                        key={proyectos.id}
                        proyecto={p} 
                    />
                ))
            }
        </ul>
    )
}

export default ListadoProyectos