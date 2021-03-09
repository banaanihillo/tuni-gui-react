import React, {useState} from "react"
import "./App.css"

const App = () => {
    const [color, setColor] = useState("hotpink")
    const [colorPickerOn, toggleColorPicker] = useState(false)

    const changeColor = (event) => {
        setColor(event.target.value)
        toggleColorPicker(false)
    }
    //
    return (
        <main>
            <h1 style={{color: color}}> Colo[u]r </h1>
            <section>
                <fieldset>
                    <legend>
                        Choose a colo[u]r
                    </legend>
                    <input
                        type="radio"
                        id="primary-color"
                        value="deeppink"
                        name="color"
                        onClick={changeColor}
                    />
                    <label htmlFor="primary-color">
                        Primary colo[u]r
                    </label>
                    <br />
                    <input
                        type="radio"
                        id="secondary-color"
                        value="magenta"
                        name="color"
                        onClick={changeColor}
                    />
                    <label htmlFor="secondary-color">
                        Secondary colo[u]r
                    </label>
                    <br />
                    <input
                        type="radio"
                        id="custom-color"
                        name="color"
                        value="cyan"
                        onClick={(event) => {
                            setColor(event.target.value)
                            toggleColorPicker(true)
                        }}
                    />
                    <label htmlFor="custom-color">
                        Custom colo[u]r
                    </label>
                    {colorPickerOn
                        &&
                        <input
                            type="color"
                            id="custom-color"
                            value="#00FFFF"
                            onInput={(event) => {
                                setColor(event.target.value)
                            }}
                        />
                    } {/* */}
                </fieldset>
            </section>
            {/* */}
        </main>
    )
}

export default App
