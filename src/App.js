import React from "react"
import "./App.css"
import PieChart from "./PieChart"

const App = () => {
    const data = [
        {
            name: "Thing",
            value: 54
        },
        {
            name: "anotherThing",
            value: 99
        }
    ]
    return <main>
        <PieChart data={data} />
    </main>
}

export default App
