import React, {useState, useEffect} from "react"
import "./App.css"

const App = () => {
    const [updatedColor, setUpdatedColor] = useState("")
    const [selectedShape, setSelectedShape] = useState("")
    const [spacing, setSpacing] = useState(16)

    useEffect(() => {
        if (selectedShape) {
            /*
            Remove the selected-shape class from the previous shape,
            whenever a new shape is selected
            */
            return () => {
                selectedShape.classList.remove("selected-shape")
            }
        }
    },
    [selectedShape])

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

    const toggleModal = (dialogElement, open=true) => {
        /*
        Instead of showModal() and close(),
        set/remove the open attribute on unsupported browsers
        */
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

    const selectShape = (shapeIdentifier) => {
        let shapeElement = document.getElementById(shapeIdentifier)
        setSelectedShape(shapeElement)
        shapeElement.classList.add("selected-shape")
    }

    const commitAction = (actionType) => {
        switch (actionType) {
            case "Add shape":
                console.log("Adding a shape")
                break
            case "Edit shape":
                if (!selectedShape) {
                    console.log("Select a shape to edit first.")
                    return
                }
                let colorDialog = document
                    .getElementById("color-dialog")
                toggleModal(colorDialog, true)
                break
            case "Delete shape":
                if (!selectedShape) {
                    console.log("Select which shape to delete first.")
                    return
                }
                console.log("Deleting this selected thing")
                break
            case "Adjust spacing":
                let spacingDialog = document
                    .getElementById("spacing-dialog")
                toggleModal(spacingDialog, true)
                break
            default:
                throw new Error("Unsupported command")
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
                            commitAction(item)
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
                    <dialog id="color-dialog">
                        <header> Edit shape </header>
                        <p>
                            <label htmlFor="updated-color-input">
                                New color:
                            </label>
                            <input
                                type="color"
                                id="updated-color-input"
                                value={updatedColor}
                                onChange={(event) => {
                                    setUpdatedColor(event.target.value)
                                }}
                            />
                            <button onClick={() => {
                                let colorDialog = document
                                    .getElementById("color-dialog")
                                toggleModal(colorDialog, false)
                            }}>
                                OK
                            </button>
                        </p>
                    </dialog>
                    <dialog id="spacing-dialog">
                        <header> Adjust spacing </header>
                        <p>
                            <label htmlFor="updated-margin-input">
                                Margin (in pixels):
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                id="updated-margin-input"
                                value={spacing}
                                onChange={(event) => {
                                    setSpacing(event.target.value)
                                }}
                            />
                            <button onClick={() => {
                                let spacingDialog = document
                                    .getElementById("spacing-dialog")
                                toggleModal(spacingDialog, false)
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
