import React, {useState} from "react"
import "./App.css"
import torontoSkyline from "./toronto-skyline-500x330.jpg"

const App = () => {
    const [image, setImage] = useState(torontoSkyline)
    const [headingText, setHeadingText] = useState("Editable heading")
    const [captionText, setCaptionText] = useState("Editable caption")
    const [undoStack, setUndoStack] = useState(null)
    const [redoStack, setRedoStack] = useState(null)

    return <span>
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
            onPaste={(event) => {
                event.preventDefault()
                setUndoStack(event.target.outerHTML)
                const pastedText = event.clipboardData.getData("text")
                const splitText = pastedText.split("\n")
                setHeadingText(splitText[0])
                setCaptionText(splitText[1])
            }}
        >
            <header>
                <h1>
                    {headingText}
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
                <figcaption>
                    {captionText}
                </figcaption>
            </figure>
        </main>
        <footer>
            <span className="button-container">
                <button onClick={() => {
                    if (!undoStack) {
                        return console.log("Nothing to undo.")
                    }
                    const mainElement = document.querySelector("main")
                    setRedoStack(mainElement.outerHTML)
                    mainElement.outerHTML = undoStack
                    setUndoStack(null)
                }}>
                    Undo
                </button>
                <button onClick={() => {
                    if (!redoStack) {
                        return console.log("Nothing to redo.")
                    }
                    const mainElement = document.querySelector("main")
                    setUndoStack(mainElement.outerHTML)
                    mainElement.outerHTML = redoStack
                    setRedoStack(null)
                }}>
                    Redo
                </button>
            </span>
            <p>
                Use the context menu for text content manipulation.
                <br />
                Click anywhere on the above container to access all the available commands detailed below.
            </p>
            <p>
                Select all (<code>ctrl + a</code>)
                enables selection of all the page content.
            </p>
            <p>
                Copy (<code>ctrl + c</code>)
                copies the selection as rich text.
                Try pasting it into Word, for example.
                <br />
                Also try copying text content with a line break in between from somewhere else,
                and Paste (<code>ctrl + v</code>) it here.
            </p>
            <p>
                After making a change,
                you can Undo (<code>ctrl + z</code>) that change,
                or Redo (<code>ctrl + y</code>) a change that you just undid.
                <br />
                Some browsers may also use
                <code> ctrl + shift + z </code>
                as Redo.
            </p>
            <p>
                If you wish to manipulate text pasted in from other sources,
                use the provided Undo and Redo buttons.
            </p>
        </footer>
    </span>
}

export default App
