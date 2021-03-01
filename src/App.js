import React, {useState} from "react"
import "./App.css"

const App = () => {
    const [mouseButton, setMouseButton] = useState("")
    const [mouseInformation, setMouseInformation] = useState("")
    const [wheelInformation, setWheelInformation] = useState("")
    return (
        <main>
            <section onMouseDown={(event) => {
                setMouseButton(`Mouse button ${event.button} clicked`)
            }}>
                {mouseButton || "Click me"}
            </section>
            <section onMouseMove={(event) => {
                setMouseInformation(
                    `(${event.clientX}, ${event.clientY})`
                )
            }}>
                {mouseInformation || "Hover on me"}
            </section>
            <section onWheel={(event) => {
                setWheelInformation("Wheel delta Y: " + event.deltaY)
            }}>
                {wheelInformation || "Scroll over me"}
            </section>
        </main>
    )
}

export default App
