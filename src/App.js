import React, {useState} from "react"
import "./App.css"
import PieChart from "./PieChart"

const App = () => {
    const [data, setData] = useState([
        {
            name: "Thing",
            value: 54
        },
        {
            name: "anotherThing",
            value: 99
        }
    ])

    return <main>
        <PieChart data={data} setData={setData} />
    </main>
}

export default App
