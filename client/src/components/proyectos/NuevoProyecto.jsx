import React, {useState, useContext} from "react";
import proyectoContext from "../../context/proyectos/ProyectoContext";

const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext)
    const {formulario, mostrarFormulario, agregarProyecto, errorformulario, mostrarError} = proyectosContext;

    const [proyecto, setProyecto] = useState({
        nombre: ""
    })

    const {nombre} = proyecto;

    const onChangeProyecto = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = (e) => {
        e.preventDefault()
        
        if(nombre == undefined || nombre === '') {mostrarError(); return;}

        agregarProyecto(proyecto)
        setProyecto({
            nombre: ""
        })
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={()=>mostrarFormulario()}
            >Nuevo proyecto</button>

            {
                (formulario) 
                &&
                (<form 
                    className="formulario-nuevo-proyecto" 
                    onSubmit={onSubmitProyecto}
                >

                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />

                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar proyecto"
                    />

                </form>)
            }

            {
                errorformulario && <p className="mensaje error">El nombre del proyecto es obligatorio</p>
            }
        </>
    )
}

export default NuevoProyecto;
