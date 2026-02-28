import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";

import MOCK_DATA_MENU from "./mocks/mockResDataMenu.json";
import Header from "../components/Header";
import RestaurantMenu from "../components/RestaurantMenu";
import Cart from "../components/Cart";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        ok: true,
        text: () => {
            return Promise.resolve(JSON.stringify(MOCK_DATA_MENU));
        }
    });
});

it("Should load restaurant menu component", async () => {
    await act(async () =>
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                    <RestaurantMenu />
                    <Cart />
                </Provider>
            </BrowserRouter>
        )
    );

    const accordion_header = screen.getByText("Recommended (20)");
    fireEvent.click(accordion_header);
    fireEvent.click(accordion_header);

    expect(screen.getAllByTestId("foodItems").length).toBe(20);
    expect(screen.getByText("Cart (0)")).toBeInTheDocument();

    const add = screen.getAllByTestId("add");
    fireEvent.click(add[0]);

    expect(screen.getByText("Cart (1)")).toBeInTheDocument();
    fireEvent.click(add[1]);
    expect(screen.getByText("Cart (2)")).toBeInTheDocument();

    expect(screen.getAllByTestId("foodItems").length).toBe(22);

    const clearCart = screen.getByRole('button', { name: 'Clear cart' });
    fireEvent.click(clearCart);
    expect(screen.getAllByTestId("foodItems").length).toBe(20);
});