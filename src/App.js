import React, {useState} from "react"
import "./App.css"

const App = () => {
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [middleNameEnabled, enableMiddleName] = useState(false)
    const [lastName, setLastName] = useState("")
    return (
        <div>
            <label htmlFor="first-name-input"> First name: </label>
            <input
                id="first-name-input"
                value={firstName}
                onChange={({target}) => setFirstName(target.value)}
            />
            <br />
            <label htmlFor="middle-name-input"> Middle name: </label>
            <input
                id="middle-name-input"
                value={middleName}
                disabled={!middleNameEnabled}
                onChange={({target}) => setMiddleName(target.value)}
            />
            <br />
            <label htmlFor="middle-name-hidden"> Middle name </label>
            {/*
            The assignment mentions a checkbox,
            but the visual cue has a radio button instead -
            could alternatively use a checkbox here,
            to enable it to be unchecked after initial selection,
            but decided to just go with a radio input
            */}
            <input
                type="radio"
                id="middle-name-hidden"
                value={middleNameEnabled}
                onChange={() => enableMiddleName(true)}
            />
            <br />
            <label htmlFor="last-name-input"> Last name: </label>
            <input
                id="last-name-input"
                value={lastName}
                onChange={({target}) => setLastName(target.value)}
            />
            <br />
            <button
                onClick={() => {
                    setFirstName("Banaani")
                    setMiddleName("banaanihillo")
                    setLastName("Hillo")
                }}
            >
                Auto-fill
            </button>
        </div>
    )
}

export default App
