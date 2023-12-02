import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Game from "./App.js"
import "@testing-library/jest-dom"

test("test Bot Activation-button behaviour", () => {
    render(<Game />)
    var botButton = screen.getByText("Bot activate")
    expect(botButton).toBeInTheDocument()
    fireEvent.click(botButton)
    botButton = screen.getByText("Bot deactivate")
    expect(botButton).toBeInTheDocument()
})

test('Validate switching between X and O', () => {
    render(<Game />)
    var square = screen.getAllByTestId("square")
    expect(square.length).toBe(9)
    var status = screen.getByText("Next player: X")
    fireEvent.click(square[0])
    status = screen.getByText("Next player: O")
    fireEvent.click(square[5])
    var status = screen.getByText("Next player: X")
})