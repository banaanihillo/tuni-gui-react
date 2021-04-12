import React, {useState} from "react"
import "./App.css"
import texts from "./texts.json"

const App = () => {
    const [language, setLanguage] = useState("en-CA")
    const [textToReverse, setTextToReverse] = useState("")
    // If the specified language is available, use that one,
    // and if not, fall back to English
    const localeTexts = (texts.hasOwnProperty(language)
        ? texts[language]
        : texts["en-CA"]
    )

    const toggleLanguage = () => {
        if (language === "en-CA") {
            setLanguage("fi-FI")
        } else {
            setLanguage("en-CA")
        }
    }//

    return <main>
        <button onClick={toggleLanguage}>
            {(language === "en-CA")
                ? "FI"
                : "EN"
            }
        </button>
        <h1>
            {localeTexts.REVERSER}
        </h1>
        <div className="input-output-container">
            <label htmlFor="reverser-input">
                {localeTexts.INPUT}
            </label>
            <input
                type="text"
                id="reverser-input"
                value={textToReverse}
                onChange={(event) => {
                    setTextToReverse(event.target.value)
                }}
            />
            <h2> {localeTexts.REVERSED} </h2>
            <output>
                {/* Convert the text into an array of characters,
                    so it can be trivially reversed,
                    then convert it back into a string
                */}
                {textToReverse.split("").reverse().join("")}
            </output>
        </div>
    </main>
}

export default App
