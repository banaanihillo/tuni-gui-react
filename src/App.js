import React, {useState, useEffect} from "react"
import "./App.css"
//
const App = () => {
    const [topText, setTopText] = useState("Captioned")
    const [bottomText, setBottomText] = useState("image")
    const [canvasWidth, setCanvasWidth] = useState(
        window.innerWidth - 20
    )

    const [canvasHeight, setCanvasHeight] = useState(
        window.innerHeight - 80
    )
    const [canvasContext, setCanvasContext] = useState(null)

    useEffect(() => {

        window.onresize = (event) => {
            setCanvasWidth(event.target.innerWidth - 20)
            setCanvasHeight(event.target.innerHeight - 80)
        }
    },
    [])

    return <main>
        <figure>
            <figcaption>
                Paste an image URL here
            </figcaption>
            <canvas
                contentEditable={true}
                width={canvasWidth}
                height={canvasHeight}
                onPaste={(event) => {
                    event.preventDefault()
                    let image = new Image()
                    image.src = event.clipboardData.getData("text")
                    let context = event.target.getContext("2d")
                    context.fillStyle = "magenta"
                    context.font = "20px sans-serif"
                    image.onload = () => {
                        /* Center the text,
                        by first measuring the total width,
                        then dividing it in half
                        */
                        const topTextCenter = context
                            .measureText(topText)
                                .width / 2
                        const bottomTextCenter = context
                            .measureText(bottomText)
                                .width / 2
                        /* Use the width and height of the canvas,
                        and the intrinsic size of the pasted image,
                        to draw it at the center of the canvas
                        */
                        context.drawImage(
                            image,
                            (canvasWidth - image.naturalWidth) / 2,
                            (canvasHeight - image.naturalHeight) / 2
                        )
                        /* Take the center of the canvas,
                        and the canvas center minus the text center,
                        to find out where the text should start,
                        to make it centered along the canvas
                        */
                        context.fillText(
                            topText,
                            (canvasWidth / 2 - topTextCenter),
                            20
                        )
                        context.fillText(
                            bottomText,
                            (canvasWidth / 2 - bottomTextCenter),
                            (canvasHeight - 20)
                        )
                    }
                    context.save()
                    setCanvasContext(context)
                }}
            ></canvas>
        </figure>
        <form>
            <label htmlFor="top-text-input">
                Top text
            </label>
            <input
                type="text"
                id="top-text-input"
                value={topText}
                onChange={(event) => {
                    setTopText(event.target.value)
                }}
            />
            <label htmlFor="bottom-text-input">
                Bottom text
            </label>
            <input
                type="text"
                id="bottom-text-input"
                value={bottomText}
                onChange={(event) => {
                    setBottomText(event.target.value)
                }}
            />
            <button
                type="cancel"
                onClick={(event) => {
                    event.preventDefault()
                    if (canvasContext) {
                        canvasContext.clearRect(
                            0,
                            0,
                            canvasWidth,
                            canvasHeight
                        )
                    }
                }}
            >
                Clear canvas
            </button>
        </form>
    </main>

}

export default App
