import React, {useState} from "react"
import "./App.css"

const App = () => {
    const [calendarEvents/*, setCalendarEvents*/] = useState([
        {
            date: "1970-01-01",
            description: "The beginning of time",
            private: false,
            id: "Bananana anana na bana"
        }
    ])

    const showDialog = (open=true) => {
        let dialogElement = document.querySelector("dialog")
        if (typeof dialogElement.showModal === "function") {
            if (open) {
                dialogElement.showModal()
            } else {
                dialogElement.close()
            }
        } else {
            if (open) {
                dialogElement.setAttribute("open", "true")
            } else {
                dialogElement.removeAttribute("open")
            }
        }
    }

    return <span>
        <table>
            <thead>
                <tr>
                    <th> Date </th>
                    <th> Event </th>
                    <th> Private </th>
                </tr>
            </thead>
            <tbody>
                {calendarEvents.map(calendarEvent => {
                    return <tr key={calendarEvent.id}>
                        <td> {calendarEvent.date} </td>
                        <td> {calendarEvent.description} </td>
                        <td>
                            {(calendarEvent.private)
                                ? "Private"
                                : "Public"
                            }
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        <button onClick={() => showDialog(true)}>
            Add
        </button>
        <dialog>
            <button>
                Add
            </button>
            <button onClick={() => showDialog(false)}>
                Cancel
            </button>
        </dialog>
    </span>
}

export default App
