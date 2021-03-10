import React, {useState} from "react"
import "./App.css"

const App = () => {
    const [updatedText, setUpdatedText] = useState("")
    const [selectedShape, setSelectedShape] = useState("")

    const lotsOfNumbers = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
    ]

    const paintCircle = () => {
        return <circle
            cx={25}
            cy={25}
            r={20}
        />
    }

    const selectShape = (id) => {
        setSelectedShape(id)
        let shapeElement = document.getElementById(id)
        shapeElement.classList.add("selected-shape")
    }

    const showDialog = (dialogType) => {
        if (dialogType === "Add shape") {
            console.log("Adding a new shape")
        } else if (dialogType === "Edit shape") {
            console.log(selectedShape)
        } else {
            setUpdatedText("")
            let dialogElement = document.querySelector("dialog")
            /*
            Instead of showModal() and close(),
            set/remove the open attribute on unsupported browsers
            */
            if (typeof dialogElement.showModal === "function") {
                dialogElement.showModal()
            } else { // Does basically the same thing as showModal()
                dialogElement.setAttribute("open", "true")
            }
        }
    }

    const listItems = [
        "Add shape", "Edit shape", "Delete shape", "Adjust spacing"
    ]

    const mapListItems = () => {
        return (
            <ul>
                {listItems.map(item => {
                    return (
                        <li key={item} onClick={() => {
                            showDialog(item)
                        }}>
                            {item}
                        </li>
                    )
                })}
            </ul>
        )
    }
    
    return (
        <span>
            <header>
                <nav>
                    {mapListItems()}
                </nav>
            </header>
            <main>
                
                <section>
                    <dialog>
                        <header> Update </header>
                        <p>
                            <label htmlFor="updated-text-input">
                                Update the paragraph text:
                            </label>
                            <input
                                type="text"
                                id="updated-text-input"
                                value={updatedText}
                                onChange={(event) => {
                                    setUpdatedText(event.target.value)
                                }}
                            />
                            <button onClick={() => {
                                let dialogElement = document
                                    .querySelector("dialog")
                                if (
                                    typeof dialogElement.close
                                    === "function"
                                ) {
                                    dialogElement.close()
                                } else {
                                    dialogElement
                                        .removeAttribute("open")
                                }
                            }}>
                                OK
                            </button>
                        </p>
                    </dialog>
                    <p id="shape-container">
                        {lotsOfNumbers.map(shape => {
                            return <svg
                                width={50}
                                height={50}
                                key={`Shape ${shape}`}
                                id={`shape-${shape}`}
                                stroke="magenta"
                                fill="magenta"
                                onClick={() => {
                                    selectShape(`shape-${shape}`)
                                }}
                            >
                                {paintCircle()}
                            </svg>
                        })}
                    </p>
                </section>
            </main>
        </span>
    )
}

export default App
