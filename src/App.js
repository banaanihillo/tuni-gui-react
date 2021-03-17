import React, {useState, useEffect} from "react"
import "./App.css"

const App = () => {
    const [red, setRed] = useState(0)
    const [green, setGreen] = useState(0)
    const [blue, setBlue] = useState(0)
    useEffect(() => {
        let rangeContainer = document.querySelector(".range-container")
        rangeContainer.style
            .backgroundColor = `rgb(${red}, ${green}, ${blue})`
    },
    [red, green, blue])
    
    return <div className="range-container">
        <label htmlFor="red-input">
            Red
        </label>
        <input
            type="range"
            min={0}
            max={255}
            /* Only for Gecko, css handles the rest */
            orient="vertical"
            id="red-input"
            value={red}
            onChange={(event) => setRed(event.target.value)}
        />
        <label htmlFor="green-input">
            Green
        </label>
        <input
            type="range"
            min={0}
            max={255}
            orient="vertical"
            id="green-input"
            value={green}
            onChange={(event) => setGreen(event.target.value)}
        />
        <label htmlFor="blue-input">
            Blue
        </label>
        <input
            type="range"
            min={0}
            max={255}
            orient="vertical"
            id="blue-input"
            value={blue}
            onChange={(event) => setBlue(event.target.value)}
        />
    </div>
}

export default App
