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

test('Validate winning game', () => {
    render(<Game />)
    var square = screen.getAllByTestId("square")
    expect(square.length).toBe(9)
    var status = screen.getByText("Next player: X")
    fireEvent.click(square[0])
    fireEvent.click(square[5])
    fireEvent.click(square[1])
    fireEvent.click(square[8])
    fireEvent.click(square[2])
    var status = screen.getByText("Winner: X")
})

test('Validate switching theme', () => {
    render(<Game />)
    var theme_switch = screen.getByTestId("theme-switch")
    var main_div = screen.getByTestId("main-div")
    var theme = main_div.id
    expect(theme).toBe("dark")
    fireEvent.click(theme_switch)
    var theme = main_div.id
    expect(theme).toBe("light")
    
})