import React, {useContext} from "react";
import proyectoContext from "../../context/proyectos/ProyectoContext";

const FormTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    if(!proyecto) return null;

    const [proyectoActual] = proyecto;

    return (
        <div className="formulario">
            <form 
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        placeholder="Agregar tarea"
                    />
                </div>

            </form>
        </div>
    )
}

export default FormTareas;
