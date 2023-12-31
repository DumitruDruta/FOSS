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


test("test Bot  behaviour", () => {
    render(<Game />)
    var botButton = screen.getByText("Bot activate")
    expect(botButton).toBeInTheDocument()
    fireEvent.click(botButton)
    var square = screen.getAllByTestId("square")
    expect(square.length).toBe(9)
    fireEvent.click(square[1])
    var x = false
    var o = false 
    
    for (let i = 0; i < square.length; i++){
        if (square[i].textContent = "X"){
            x = true
        }
        if (square[i].textContent = "O"){
            o = true
        }
    }
    expect(x && o).toBe(true)
})

test("test go back to move", () => {
    render(<Game />)
    var botButton = screen.getByText("Bot activate")
    expect(botButton).toBeInTheDocument()
    fireEvent.click(botButton)
    var square = screen.getAllByTestId("square")
    expect(square.length).toBe(9)
    fireEvent.click(square[1])
    fireEvent.click(square[2])
    var squaresMv = screen.getAllByTestId("square")

    var gameStart = screen.getByText("Go to game start")
    fireEvent.click(gameStart)
    var squareGmStart = screen.getAllByTestId("square")

    var isEqual = true 
    for (let i = 0; i < square.length; i++){
        if (square[i] != squareGmStart [i]){
            x = false
        }
    }
    
    var move = screen.getByText("Go to move #2")
    fireEvent.click(move)
    var squaresMvTest = screen.getAllByTestId("square")
    for (let i = 0; i < square.length; i++){
        if (squaresMv[i] != squaresMvTest [i]){
            x = false
        }
    }
    expect(isEqual).toBe(true)

})


test('test switching between X and O', () => {
    render(<Game />)
    var square = screen.getAllByTestId("square")
    expect(square.length).toBe(9)
    var status = screen.getByText("Next player: X")
    fireEvent.click(square[0])
    status = screen.getByText("Next player: O")
    fireEvent.click(square[5])
    var status = screen.getByText("Next player: X")
})

test('test winning game', () => {
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

test('test switching theme', () => {
    render(<Game />)
    var theme_switch = screen.getByTestId("theme-switch")
    var main_div = screen.getByTestId("main-div")
    var theme = main_div.id
    expect(theme).toBe("dark")
    fireEvent.click(theme_switch)
    var theme = main_div.id
    expect(theme).toBe("light")
    
})

test('test adding player names input change', () => {
    render(<Board/>)

    var maneInputX = screen.getByPlaceholderText("Type X Name")
    fireEvent.change(maneInputX, { target: { value: 'testa' } })
    expect(maneInputX.value).toBe("testa")
    var maneInputO = screen.getByPlaceholderText("Type O Name")
    fireEvent.change(maneInputO, { target: { value: 'testb' } })
    expect(maneInputO.value).toBe("testb")
})

test('test adding player names button press functionality', () => {
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

    fireEvent.click(square[0])
    fireEvent.click(square[3])
    fireEvent.click(square[1])
    fireEvent.click(square[4])

    await new Promise(resolve => setTimeout(resolve, 0))

    var movesList = document.getElementsByClassName("orderedList")[0]
    expect(movesList).toBeInTheDocument()

    var movesCount = 5
    var listItems = movesList.getElementsByTagName('li')
    expect(listItems.length).toBe(movesCount)
  
    var firstListItem = listItems[0]
    expect(firstListItem).toHaveTextContent("Go to game start")

    var lastListItem = listItems[movesCount - 1]
    expect(lastListItem).toHaveTextContent("Go to move #4")
  })
  
  test('Check Go to Game Start', () => {
    render(<Game />)

    const square = screen.getAllByTestId("square")
    fireEvent.click(square[0])
    fireEvent.click(square[3])

    const goToGameStartButton = screen.getByText("Go to game start")
    fireEvent.click(goToGameStartButton)
  
    const status = screen.getByText("Next player: X")
    expect(status).toBeInTheDocument()
  
    const movesList = document.getElementsByClassName("orderedList")[0]
    const listItems = movesList.getElementsByTagName('li')
    const firstListItem = listItems[0]
    expect(firstListItem).toHaveTextContent("Go to game start")
  })
