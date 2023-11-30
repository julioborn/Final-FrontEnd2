import { render, screen } from "../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { MENSAJE_CARGANDO, NO_ENCONTRADO, NOMBRE_INVALIDO } from "../features/quote/constants";
import Cita from "../features/quote/Cita";

// Estas citas son directamente a la API
describe("Pruebas en <Cita />", () => {
    test("Render del componente Cita", () => {
        render(<Cita />);

        const mensaje = screen.getByText(NO_ENCONTRADO);
        const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        const botonCita = screen.getByRole("button", { name: /Obtener cita aleatoria/i });
        const botonBorrar = screen.getByRole("button", { name: /Borrar/i });

        expect(mensaje).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(botonCita).toBeInTheDocument();
        expect(botonBorrar).toBeInTheDocument();
    });

    test("Debe mostrar el mensaje de carga cuando se esté buscando un personaje", async () => {
        render(<Cita />);

        const boton = screen.getByRole("button", { name: /Obtener cita aleatoria/i });
        fireEvent.click(boton);

        await waitFor(() => {
            const mensaje = screen.getByText(MENSAJE_CARGANDO);
            expect(mensaje).toBeTruthy();
        });
    });

    test("Debe mostrar un mensaje de error al buscar un personaje inexistente", async () => {
        render(<Cita />);

        const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        await fireEvent.change(input, { target: { value: "Julio" } });

        const boton = await screen.findByText(/Obtener Cita/i);
        fireEvent.click(boton);

        await waitFor(() => screen.findByText(NOMBRE_INVALIDO), { timeout: 2500 })
    });

    test("Debe borrarse una cita al clickear el botón 'Borrar'", async () => {
        render(<Cita />);

        const boton = screen.getByRole("button", { name: /Obtener cita aleatoria/i });
        fireEvent.click(boton)

        const botonBorrar = screen.getByText(/Borrar/i);
        fireEvent.click(botonBorrar);

        const mensaje = screen.getByText(NO_ENCONTRADO);
        await waitFor(() => {
            expect(mensaje).toBeInTheDocument();
        });
    });

    test("Debe verificar que la cita sea del personaje ingresado", async () => {
        render(<Cita />);

        const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        fireEvent.change(input, { target: { value: "Lisa" } });
        
        const boton = await screen.findByText(/Obtener Cita/i);
        fireEvent.click(boton);

        const personaje = "Lisa Simpson";
        await waitFor(() => screen.findByText(personaje), { timeout: 2000 });

        const nombre = screen.getByText(personaje);
        expect(nombre).toBeInTheDocument();
    });

});