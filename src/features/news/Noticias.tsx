import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import * as Styled from "./styled";
import { INoticiasNormalizadas, INoticiasService } from "./types";

// Interfaz que define el contrato para los servicios de noticias
export interface NoticiasProps {
  noticiasService: INoticiasService; // Cumple con el Principio de Inversión de Dependencia (D)
}

/**
 * Componente que renderiza una lista de noticias de Los Simpsons.
 * Aplica el Principio de Inversión de Dependencia (Dependency Inversion Principle - D)
 * ya que recibe un servicio de noticias a través de una abstracción (INoticiasService).
 * @param {NoticiasProps} props - Propiedades del componente.
 * @returns {JSX.Element} JSX del componente Noticias.
 */
const Noticias: React.FC<NoticiasProps> = ({ noticiasService }) => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await noticiasService.obtenerNoticias();

      const data = respuesta.map((n) => {
        const titulo = n.titulo
          .split(" ")
          .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          })
          .join(" ");

        const ahora = new Date();
        const minutosTranscurridos = Math.floor(
          (ahora.getTime() - n.fecha.getTime()) / 60000
        );

        return {
          id: n.id,
          titulo,
          descripcion: n.descripcion,
          fecha: `Hace ${minutosTranscurridos} minutos`,
          esPremium: n.esPremium,
          imagen: n.imagen,
          descripcionCorta: n.descripcion.substring(0, 100),
        };
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, [noticiasService]);

  return (
    <Styled.ContenedorNoticias>
      <Styled.TituloNoticias>Noticias de los Simpsons</Styled.TituloNoticias>
      <Styled.ListaNoticias>
        {noticias.map((n) => (
          <Styled.TarjetaNoticia key={n.id}>
            <Styled.ImagenTarjetaNoticia src={n.imagen} />
            <Styled.TituloTarjetaNoticia>{n.titulo}</Styled.TituloTarjetaNoticia>
            <Styled.FechaTarjetaNoticia>{n.fecha}</Styled.FechaTarjetaNoticia>
            <Styled.DescripcionTarjetaNoticia>
              {n.descripcionCorta}
            </Styled.DescripcionTarjetaNoticia>
            <Styled.BotonLectura onClick={() => setModal(n)}>Ver más</Styled.BotonLectura>
          </Styled.TarjetaNoticia>
        ))}
        {modal ? (
          modal.esPremium ? (
            <Styled.ContenedorModal>
              <Styled.TarjetaModal>
                <Styled.CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </Styled.CloseButton>
                <Styled.ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <Styled.CotenedorTexto>
                  <Styled.TituloModal>Suscríbete a nuestro Newsletter</Styled.TituloModal>
                  <Styled.DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos.
                  </Styled.DescripcionModal>
                  <Styled.BotonSuscribir
                    onClick={() =>
                      setTimeout(() => {
                        alert("Suscripto!");
                        setModal(null);
                      }, 1000)
                    }
                  >
                    Suscríbete
                  </Styled.BotonSuscribir>
                </Styled.CotenedorTexto>
              </Styled.TarjetaModal>
            </Styled.ContenedorModal>
          ) : (
            <Styled.ContenedorModal>
              <Styled.TarjetaModal>
                <Styled.CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </Styled.CloseButton>
                <Styled.ImagenModal src={modal.imagen} alt="news-image" />
                <Styled.CotenedorTexto>
                  <Styled.TituloModal>{modal.titulo}</Styled.TituloModal>
                  <Styled.DescripcionModal>{modal.descripcion}</Styled.DescripcionModal>
                </Styled.CotenedorTexto>
              </Styled.TarjetaModal>
            </Styled.ContenedorModal>
          )
        ) : null}
      </Styled.ListaNoticias>
    </Styled.ContenedorNoticias>
  );
};

export default Noticias;
