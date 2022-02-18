import React, {useContext, useState, createRef, useEffect} from "react";
import proyectoContext from "../../context/proyectos/ProyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTareas = () => {

    const [tarea, setTarea] = useState({
        nombre: ''
    });
    //extraer el nombre de la tarea
    const {nombre} = tarea;

    // const [idTarea, setIdTarea] = useState()

    const nombreRef = createRef(null)

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea} = tareasContext;

    useEffect(()=>{
        if(tareaseleccionada !== null) setTarea(tareaseleccionada);
        else setTarea('');
    }, [tareaseleccionada])

    if(!proyecto) return null;

    const [proyectoActual] = proyecto;

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const submit = e => {
        e.preventDefault(); 

        //hacer la validación
        if(nombre.trim() === ''){
            validarTarea();
            return;
        };

        if(tareaseleccionada === null){

            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }

        if(tareaseleccionada !== null){
            tareaseleccionada.nombre = nombre;
            actualizarTarea(tareaseleccionada);
        }

        setTarea({nombre: ''})
        nombreRef.current.focus()
    }

    return (
        <div className="formulario">
            <form 
                onSubmit={submit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        ref={nombreRef}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>

            </form>

            {
                errortarea
                ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
                : null
            }

        </div>
    )
}

export default FormTareas;
