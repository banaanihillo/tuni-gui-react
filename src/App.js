import React, {useState, useEffect} from "react"
import "./App.css"

/*
    <input type="date"> remains a locale nightmare, so,
    instead of forcing the user to conform to MM/DD/YYY (for example),
    use three separate input elements,
    to make sure the only unambiguous format (YYYY-MM-DD) is used
*/

const App = () => {
    const [dates, setDates] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if (selected) {
            return () => {
                selected.classList.remove("selected")
            }
        }
    },
    [selected])

    const mapOptions = (optionValue) => {
        return <option key={optionValue}>
            {/*
                Pad the months and days from 1 to 9,
                so they become 01 to 09
            */}
            {String(optionValue).padStart(2, "0")}
        </option>
    }

    const updateProperty = (dateObject, property, value) => {
        const updatedDates = dates.map(date => {
            return (date.id === dateObject.id)
                ? {...date, [property]: value}
                : date
        })
        setDates(updatedDates)
    }

    return <div className="application-container">
        <ul>
            {dates.map((date, index) => {
                return <li
                    key={index}
                    className="list-container"
                    onClick={(event) => {
                        event.currentTarget.classList.add("selected")
                        setSelected(event.currentTarget)
                    }}
                >
                    {/*    YYYY   -      MM     -     DD */}
                    {`${date.year}-${date.month}-${date.day}`}
                    <span>
                        <label htmlFor={`year-input-${index}`}>
                            Year (YYYY)
                        </label>
                        <input
                            type="number"
                            min={1970}
                            max={9999}
                            id={`year-input-${index}`}
                            placeholder="YYYY"
                            onChange={(event) => {
                                // "Prevent" years larger than 9999
                                if (event.target.value.length > 4) {
                                    return
                                }
                                updateProperty(
                                    date,
                                    "year",
                                    /*
                                    If the input is less than 1000,
                                    add leading zeroes to make it YYYY
                                    */
                                    event.target.value.padStart(4, "0")
                                )
                            }}
                        />
                    </span>
                    <span>
                        <label htmlFor={`month-input-${index}`}>
                            Month
                        </label>
                        <select
                            onChange={(event) => {
                                updateProperty(
                                    date,
                                    "month",
                                    event.target.value
                                )
                            }}
                            defaultValue="MM"
                        >
                            {/* Use MM as a placeholder, kind of */}
                            <option disabled>
                                MM
                            </option>
                            {/* 12 months, starting from 01 */}
                            {[...Array(12)].map((_value, index) => {
                                return mapOptions(index + 1)
                            })}
                        </select>
                    </span>
                    <span>
                        <label htmlFor={`day-input-${index}`}>
                            Day
                        </label>
                        <select
                            onChange={(event) => {
                                updateProperty(
                                    date,
                                    "day",
                                    event.target.value
                                )
                            }}
                            defaultValue="DD"
                        >
                            <option disabled>
                                DD
                            </option>
                            {/* 31 days, starting from 01 */}
                            {[...Array(31)].map((_value, index) => {
                                return mapOptions(index + 1)
                            })}
                        </select>
                    </span>
                </li>
            })}
        </ul>
        <div className="button-container">
            <button onClick={() => {
                const today = new Date()
                setDates([
                    ...dates,
                    {
                        id: today.toISOString(),
                        /*
                        Use a String for year as well,
                        just for consistency,
                        although the year will be >= 1970 anyway
                        */
                        year: String(today.getFullYear())
                            .padStart(4, "0"),
                        /*
                        Counts from 0 to 11 for some reason,
                        so just add one,
                        also pad the default month and day as well,
                        to modify 1 to 9 into 01 to 09 
                        */
                        month: String(today.getMonth() + 1)
                            .padStart(2, "0"),
                        day: String(today.getDate())
                            .padStart(2, "0")
                    }
                ])
            }}>
                Add
            </button>
            <button onClick={() => {
                if (!selected) {
                    return console.log("Select an item to remove.")
                }
                selected.remove()
                setSelected(null)
            }}>
                Remove
            </button>
        </div>
    </div>
}

export default App
