import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";
import MOCK_DATA from "./mocks/mockResListData.json";
import Body from "../components/Body";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        ok: true,
        text: () => {
            return Promise.resolve(JSON.stringify(MOCK_DATA));
        }
    })
});

it("Should render the body component", async () => {
    await act(
        async () =>
            render(
                <BrowserRouter>
                    <Body />
                </BrowserRouter>
            )
    );
    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(8);

    const searchInput = screen.getByTestId("searchInput");
    // const searchBtn = screen.getByRole('button',{name: 'Search'});
    fireEvent.change(searchInput, { target: { value: "and" } });
    // fireEvent.click(searchBtn);

    const cardsAfterSearch = screen.getAllByTestId("resCard");
    expect(cardsAfterSearch.length).toBe(1);
});