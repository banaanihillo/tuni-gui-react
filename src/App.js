import React, {useState} from "react"
import "./App.css"

const App = () => {
    const [updatedText, setUpdatedText] = useState("")

    const showDialog = (dialogType) => {
        if (dialogType !== "Edit") {
            window.alert(
                `${dialogType}
                Click on Edit to modify the main text.
                `
            )
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

    const listItems = ["File", "Edit", "Help", "About"]

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
                <h1> Main heading </h1>
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
                    <p id="main-text">
                        {
                            updatedText
                            || "Click on Edit to update."
                        }
                    </p>
                </section>
            </main>
        </span>
    )
}

export default App
