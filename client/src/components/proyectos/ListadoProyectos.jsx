import React, {useContext , useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyectos, mensaje, obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //obtener los proyectos cuando carga el componente
    useEffect(()=>{

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);

    //revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <span>No hay proyectos, comienza creando uno</span>;

    return (
        <ul className="listado-proyectos">

            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            
            {
                proyectos && proyectos.map(p => (
                    <Proyecto
                        key={p._id}
                        proyecto={p} 
                    />
                ))
            }
        </ul>
    )
}

export default ListadoProyectos