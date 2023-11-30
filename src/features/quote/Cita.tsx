import { useState } from "react";
import { shallowEqual } from "react-redux";
import * as Styled from "./styled";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  obtenerCitaDelEstado,
  limpiar,
  obtenerEstadoDelPedido,
  obtenerCitaDeLaAPI,
} from "./citaSlice";
import { obtenerMensaje } from "./utils";

/**
 * Componente funcional para mostrar y gestionar citas de los personajes de los Simpsons.
 * @returns {JSX.Element} JSX que representa el componente.
 */
const Cita: React.FC = () => {
  const [valorInput, setValorInput] = useState<string>(""); // Asegura que valorInput sea siempre un string
  const { cita = "", personaje = "" } =
    useAppSelector(obtenerCitaDelEstado, shallowEqual) || {};
  const estadoPedido = useAppSelector(obtenerEstadoDelPedido);

  const dispatch = useAppDispatch();

  const onClickObtenerCita = () => dispatch(obtenerCitaDeLaAPI(valorInput));

  const onClickBorrar = () => {
    dispatch(limpiar());
    setValorInput("");
  };

  return (
    <Styled.ContenedorCita>
      <Styled.TextoCita>{obtenerMensaje(cita, estadoPedido)}</Styled.TextoCita>
      <Styled.AutorCita>{personaje}</Styled.AutorCita>
      <Styled.Input
        aria-label="Author Cita"
        value={valorInput}
        onChange={(e) => setValorInput(e.target.value)}
        placeholder="Ingresa el nombre del autor"
      />
      <Styled.Boton
        aria-label={valorInput ? "Obtener Cita" : "Obtener cita aleatoria"}
        onClick={onClickObtenerCita}
      >
        {valorInput ? "Obtener Cita" : "Obtener cita aleatoria"}
      </Styled.Boton>
      <Styled.Boton aria-label="Borrar" onClick={onClickBorrar} secondary={true}>
        Borrar
      </Styled.Boton>
    </Styled.ContenedorCita>
  );
};

export default Cita;
