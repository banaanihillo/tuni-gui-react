import React, {useState} from "react"
import "./App.css"

const App = () => {
    const [calendarEvents, setCalendarEvents] = useState([
        {
            date: "1970-01-01",
            name: "The beginning of time",
            isPrivate: false,
            id: "Bananana anana na bana"
        }
    ])
    const [name, setName] = useState("")
    const [isPrivate, togglePrivate] = useState(false)
    const [date, setDate] = useState({
        year: "",
        month: "",
        day: ""
    })

    const mapOptions = (optionValue) => {
        return <option key={optionValue}>
            {/* Add a leading zero into 1-9 */}
            {String(optionValue).padStart(2, "0")}
        </option>
    }

    const toggleModal = (open=true) => {
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
                        <td> {calendarEvent.name} </td>
                        <td>
                            {(calendarEvent.isPrivate)
                                ? "Private"
                                : "Public"
                            }
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        <button onClick={() => toggleModal(true)}>
            Add
        </button>
        <dialog>
            <form onSubmit={(event) => {
                event.preventDefault()
                setCalendarEvents(calendarEvents.concat({
                    date: `${date.year}-${date.month}-${date.day}`,
                    name,
                    isPrivate,
                    id: `${Math.random() * 500600700} banana anana`
                }))
                setName("")
                togglePrivate(false)
                setDate({
                    year: "",
                    month: "",
                    day: ""
                })
                toggleModal(false)
            }}>
                <label htmlFor="name-input">
                    Name
                </label>
                <input
                    type="text"
                    id="name-input"
                    value={name}
                    required
                    onChange={(event) => setName(event.target.value)}
                />
                <br />
                <label htmlFor="private-input">
                    Private
                </label>
                <input
                    type="checkbox"
                    id="private-input"
                    checked={isPrivate}
                    onChange={() => togglePrivate(!isPrivate)}
                />
                <br />
                <label htmlFor="year-input">
                    Year
                </label>
                <input
                    type="number"
                    id="year-input"
                    value={date.year}
                    min={1970}
                    max={9999}
                    required
                    placeholder="YYYY"
                    onChange={(event) => {
                        setDate({
                            ...date,
                            year: event.target.value
                        })
                    }}
                />
                <label htmlFor="month-input">
                    Month
                </label>
                <select
                    /* Show a placeholder when the field is empty,
                        and, on submit,
                        show the placeholder again
                    */
                    value={date.month || "MM"}
                    required
                    onChange={(event) => {
                        setDate({
                            ...date,
                            month: event.target.value
                        })
                    }}
                >
                    <option disabled>
                        MM
                    </option>
                    {/* Create an array of 12 empty elements,
                        and create an option element from each index
                    */}
                    {[...Array(12)].map((_value, index) => {
                        // From 1 to 12
                        return mapOptions(index + 1)
                    })}
                </select>
                <label htmlFor="day-input">
                    Day
                </label>
                <select
                    value={date.day || "DD"}
                    required
                    onChange={(event) => {
                        setDate({
                            ...date,
                            day: event.target.value
                        })
                    }}
                >
                    <option disabled>
                        DD
                    </option>
                    {[...Array(31)].map((_value, index) => {
                        // From 1 to 31
                        return mapOptions(index + 1)
                    })}
                </select>
                <br />
                <button type="submit">
                    Add
                </button>
                <button
                    type="button"
                    onClick={() => toggleModal(false)}
                >
                    Cancel
                </button>
            </form>
        </dialog>
    </span>
}

export default App
