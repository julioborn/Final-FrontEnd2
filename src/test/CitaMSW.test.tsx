import { Provider } from "react-redux"
import Cita from "../features/quote/Cita"
import { store } from "../app/store"
import { fireEvent, render, screen } from "../test-utils";
import { setupServer } from "msw/lib/node";
import { handlers } from "../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

// Estas citas son con MSW
describe('Pruebas en <Cita /> con MSW', () => {
    test('Debe mostrar la data correcta de Homer Simpson', async () => {
        render(
            <Provider store={store}>
                <Cita />
            </Provider>
        )

        const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        fireEvent.change(input, { target: { value: "Homer" } });

        const boton = await screen.findByText(/Obtener Cita/i);
        fireEvent.click(boton);

        const cita = await screen.findByText("All I'm gonna use this bed for is sleeping, eating and maybe building a little fort.");
        expect(cita).toBeInTheDocument();
        expect(screen.getByText("Homer Simpson")).toBeInTheDocument();
    })

    test('Debe mostrar cita de Duffman al seleccionar cita random', async () => {
        render(
            <Provider store={store}>
                <Cita />
            </Provider>
        )

        const boton = screen.getByRole("button", { name: /Obtener cita aleatoria/i });
        fireEvent.click(boton);

        const cita = await screen.findByText("Oh Yeah!");
        expect(cita).toBeInTheDocument();
        expect(screen.getByText("Duffman")).toBeInTheDocument();
    })
})