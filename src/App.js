/* eslint-disable eqeqeq */
import React from "react"
import "./App.css"

const App = () => {
    return <main>
        <section>
            <p>
                Select text to be dragged with your mouse,
                and drag it onto another paragraph,
                or onto the canvas below
            </p>
            <p>
                Try dragging selected text from this paragraph,
                to append it onto the existing paragraphs,
                or select the entire paragraph,
                to create a new copy of the paragraph
            </p>
            <p>
                These paragraphs are not editable,
                so you may not overwrite them -
                use the ones below to see how overwrite works
            </p>
        </section>
        <hr />
        <section
            draggable={true}
            suppressContentEditableWarning={true}
            contentEditable={true}
            onDragStart={(event) => {
                event.dataTransfer.setData(
                    "text/html",
                    event.target.textContent
                )
            }}
        >
            <p>
                You can cut these paragraphs
            </p>
            <p>
                Also try selecting single words from these paragraphs
            </p>
            <p>
                Three two one
            </p>
        </section>
        <section>
            <figure>
                <figcaption> Drag here </figcaption>
                <canvas
                    width={window.innerWidth - 100}
                    height={200}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onDrop={(event) => {
                        let data = event.dataTransfer.getData(
                            "text/html"
                        )
                        let context = event.target.getContext("2d")
                        context.strokeStyle = "magenta"
                        context.fillStyle = "magenta"
                        context.fillText(
                            data,
                            event.clientX,
                            (event.clientY - event.target.height)
                        )
                    }}
                ></canvas>
            </figure>
        </section>
    </main>
}

export default App
