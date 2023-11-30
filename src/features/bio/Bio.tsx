import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import * as Styled from "./styled";

/**
Componente que renderiza la biografía de los personajes de la familia Simpson.
@returns {JSX.Element} JSX del componente Bio.
*/
const Bio: React.FC = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  /**
  * Función onClick que actualiza la información del personaje.
  * @param {NombresSimpsons} nombre - Nombre del personaje seleccionado.
  * @returns {void}
  */
  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  /**
   * Función que maneja los botones para seleccionar diferentes personajes.
   * @returns {JSX.Element[]} Array de elementos JSX que representan los botones.
   */
  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <Styled.BotonBio
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        boton={
          bioActiva.id === nombre
            ? "activo"
            : "inactivo"
        }
      >
        {nombre}
      </Styled.BotonBio>
    ));
  };

  return (
    <Styled.BioContainer>
      <Styled.ContenedorBotones>{crearBotones()}</Styled.ContenedorBotones>
      <div>
        <div>
          <Styled.BioImagen src={bioActiva.image} />
        </div>
        <div>
          <Styled.BioNombre>{bioActiva.nombre}</Styled.BioNombre>
          <Styled.BioDescripcion>{bioActiva.descripcion}</Styled.BioDescripcion>
        </div>
      </div>
    </Styled.BioContainer>
  );
};

export default Bio;
