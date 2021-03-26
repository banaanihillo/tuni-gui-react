import React, {useState} from "react"
import "./App.css"
import torontoSkyline from "./toronto-skyline-500x330.jpg"

const App = () => {
    const [image, setImage] = useState(torontoSkyline)
    /*
    const appendText = (event) => {
        setText(text + event.target.innerText)
        setUndoStack([
            ...undoStack,
            event.target.innerText
        ])
    }
    */

    /*
    const undoText = () => {
        console.log(undoStack)
        // Do nothing if the undo stack is empty
        if (undoStack.length > 0) {
            // Make a shallow copy of the current undo stack,
            const copyOfUndoStack = [...undoStack]
            // and remove the item on the top of the stack
            const removedItem = copyOfUndoStack.pop()
            // Set the text as the old text minus the removed item
            setHeadingText(copyOfUndoStack.join(""))
            // Update the undo stack,
            // to no longer include the undoed (undid?) item
            setUndoStack(copyOfUndoStack)
            // Add the removed undo item into the redo stack
            setRedoStack([
                ...redoStack,
                removedItem
            ])
        }
    }
    */

    /*
    const redoText = () => {
        // Also do nothing if the redo stack is empty
        if (redoStack.length > 0) {
            // Take the item on top of the stack,
            const lastItem = redoStack[redoStack.length - 1]
            // and append it onto the existing text
            setHeadingText(headingText + lastItem)
            // Make a shallow copy of the current redo stack,
            const copyOfRedoStack = [...redoStack]
            // and remove the item on top of the stack
            copyOfRedoStack.pop()
            // Update the redo stack,
            // to no longer include the redone (?) item
            setRedoStack(copyOfRedoStack)
            // Add the removed redo item into the undo stack
            setUndoStack([
                ...undoStack,
                lastItem
            ])
        }
    }
    */

    return (
        <main
            contentEditable={true}
            suppressContentEditableWarning={true}
            onCopy={(event) => {
                event.preventDefault()
                // Retain the source formatting here,
                event.clipboardData.setData(
                    "text/html",
                    event.target.innerHTML
                )
                // and also allow, for instance,
                // the "Keep Text Only" option on Word
                event.clipboardData.setData(
                    "text/plain",
                    event.target.innerHTML
                )
            }}
        >
            <header>
                <h1
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                >
                    Editable heading
                </h1>
            </header>
            <figure>
                <img
                    src={image}
                    alt="The roof of Rogers Centre is open, thirty minutes before first pitch"
                    onDrop={(event) => {
                        event.preventDefault()
                        const file = event.dataTransfer.files[0]
                        if (file && file.type === "image/jpeg") {
                            const fileReader = new FileReader()
                            fileReader.onloadend = () => {
                                setImage(fileReader.result)
                            }
                            fileReader.readAsDataURL(file)
                        }
                    }}
                    onDragOver={(event) => {
                        event.preventDefault()
                        event.dataTransfer.dropEffect = "copy"
                    }}
                />
                <figcaption
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onInput={(event) => {
                        console.log(event.target.textContent)
                    }}
                >
                    Editable caption
                </figcaption>
            </figure>
        </main>
    )
}

export default App
