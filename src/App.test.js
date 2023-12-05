import React from "react"
import { render, screen, fireEvent, queryByPlaceholderText } from "@testing-library/react"
import Game from "./App.js"
import Board from "./App.js"
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

test('test addiing player names input change', () => {
    render(<Board/>)

    var maneInputX = screen.getByPlaceholderText("Type X Name")
    fireEvent.change(maneInputX, { target: { value: 'testa' } })
    expect(maneInputX.value).toBe("testa")
    var maneInputO = screen.getByPlaceholderText("Type O Name")
    fireEvent.change(maneInputO, { target: { value: 'testb' } })
    expect(maneInputO.value).toBe("testb")
})

test('test addiing player names button press functionality', () => {
    render(<Board/>)

    var maneInputX = screen.getByPlaceholderText("Type X Name")
    fireEvent.change(maneInputX, { target: { value: 'testa' } })
    var maneInputO = screen.getByPlaceholderText("Type O Name")
    fireEvent.change(maneInputO, { target: { value: 'testb' } })

    var status = screen.getByTestId("status")
    var square = screen.getAllByTestId("square")

    var addingnamesbuttonx = screen.getByTestId("xplayernamebutton")
    var addingnamesbuttono = screen.getByTestId("oplayernamebutton")

    fireEvent.click(addingnamesbuttonx)
    status = screen.getByText("Next player: testa")

    fireEvent.click(addingnamesbuttono)
    fireEvent.click(square[0])
    status = screen.getByText("Next player: testb")
})

test('Check Moves List', async () => {
    render(<Game />)
    var square = screen.getAllByTestId("square")
  
    // Make a sequence of moves
    fireEvent.click(square[0]) // X's move
    fireEvent.click(square[3]) // O's move
    fireEvent.click(square[1]) // X's move
    fireEvent.click(square[4]) // O's move
  
    // Wait for the next tick of the event loop
    await new Promise(resolve => setTimeout(resolve, 0))
  
    // Check if the moves list is rendered
    var movesList = document.getElementsByClassName("orderedList")[0]
    expect(movesList).toBeInTheDocument()
  
    // Check if the list items are rendered based on the number of moves made
    var movesCount = 5 // Adjust based on the number of moves made, including the initial state
    var listItems = movesList.getElementsByTagName('li')
    expect(listItems.length).toBe(movesCount)
  
    // Check if the first list item corresponds to the initial state
    var firstListItem = listItems[0]
    expect(firstListItem).toHaveTextContent("Go to game start")
  
    // Check if the last list item corresponds to the latest move
    var lastListItem = listItems[movesCount - 1]
    expect(lastListItem).toHaveTextContent("Go to move #4") // Adjust based on the last move
  })
  
  test('Check Go to Game Start', () => {
    render(<Game />)
  
    // Make some moves
    const square = screen.getAllByTestId("square")
    fireEvent.click(square[0])
    fireEvent.click(square[3])
  
    // Click "Go to game start" button
    const goToGameStartButton = screen.getByText("Go to game start")
    fireEvent.click(goToGameStartButton)
  
    // Check if the game state is reset
    const status = screen.getByText("Next player: X")
    expect(status).toBeInTheDocument()
  
    // Ensure that the initial move is displayed in the moves list
    const movesList = document.getElementsByClassName("orderedList")[0]
    const listItems = movesList.getElementsByTagName('li')
    const firstListItem = listItems[0]
    expect(firstListItem).toHaveTextContent("Go to game start")
  })