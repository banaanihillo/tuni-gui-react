import React, {useState} from "react"
import "./App.css"
//

const App = () => {
    const [text, setText] = useState("")
    const [undoStack, setUndoStack] = useState([])
    const [redoStack, setRedoStack] = useState([])

    const appendText = (event) => {
        setText(text + event.target.innerText)
        setUndoStack([
            ...undoStack,
            event.target.innerText
        ])
    }

    const undoText = () => {
        // Do nothing if the undo stack is empty
        if (undoStack.length > 0) {
            // Make a shallow copy of the current undo stack,
            const copyOfUndoStack = [...undoStack]
            // and remove the item on the top of the stack
            const removedItem = copyOfUndoStack.pop()
            // Set the text as the old text minus the removed item
            setText(copyOfUndoStack.join(""))
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

    const redoText = () => {
        // Also do nothing if the redo stack is empty
        if (redoStack.length > 0) {
            // Take the item on top of the stack,
            const lastItem = redoStack[redoStack.length - 1]
            // and append it onto the existing text
            setText(text + lastItem)
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

    return (
        <main>
            <section>
                <p>
                    {text}
                </p>
            </section>
            <section>
                <button onClick={appendText}>
                    banana
                </button>
                <button onClick={appendText}>
                    ananas
                </button>
                <button onClick={appendText}>
                    bananas
                </button>
            </section>
            <section>
                <button onClick={undoText}>
                    Undo
                </button>
                <button onClick={redoText}>
                    Redo
                </button>
            </section>
        </main>
    )
}

export default App
