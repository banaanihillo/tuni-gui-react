import React from "react"
import "./App.css"

const App = () => {
    const showDialog = (dialogType) => {
        if (dialogType === "Edit") {
            let mainText = document.querySelector("#main-text")
            mainText.innerHTML = "Text updated successfully."
        } else {
            let dialogElement = document.querySelector("dialog")
            /*
            Gecko does not have the dialog element enabled by default,
            so fall back to an alert element for those user agents
            */
            if (typeof dialogElement.showModal === "function") {
                dialogElement.showModal()
                let dialogHeader = document.querySelector(
                    "#dialog-header"
                )
                dialogHeader.innerHTML = dialogType
            } else {
                window.alert(`${dialogType}
I am a dialog, sort of
                `)
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
                    <dialog open={false}>
                        <header id="dialog-header"></header>
                        <p>
                            I am a dialog
                        </p>
                        <button onClick={() => {
                            let dialogElement = document.querySelector(
                                "dialog"
                            )
                            dialogElement.close()
                        }}>
                            OK
                        </button>
                    </dialog>
                    <p id="main-text">
                        Click on <em> About </em> to show a dialog.
                    </p>
                </section>
            </main>
        </span>
    )
}

export default App
