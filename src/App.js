import React from "react"
import "./App.css"
//
const App = () => {
    const dateTimeParts = Intl.DateTimeFormat(
        "en-CA",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour12: false,
        }
    ).formatToParts(
        new Date()
    )
    // The parts are stored as [{type: "weekday", value: "Friday"}],
    // so just find the part by its type, and take its value
    const weekday = dateTimeParts.find(dateTime => {
        return (dateTime.type === "weekday")
    }).value
    const day = dateTimeParts.find(dateTime => {
        return (dateTime.type === "day")
    }).value
    const month = dateTimeParts.find(dateTime => {
        return (dateTime.type === "month")
    }).value
    const year = dateTimeParts.find(dateTime => {
        return (dateTime.type === "year")
    }).value

    return <div>
        <main></main>
        <footer>
            <span className="date-time-container">
                <span> {weekday} </span>
                <span className="fat-number">
                    {day}
                </span>
                <span> {month} </span>
                <span> {year} </span>
            </span>
        </footer>
    </div>
} //

export default App
