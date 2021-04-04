import React, {useState, useEffect} from "react"
import "./App.css"
//
const App = () => {
    const [leftColor, setLeftColor] = useState("#FF00FF")
    const [rightColor, setRightColor] = useState("#00FFFF")
    const [bottomColor, setBottomColor] = useState("#FFFF00")
    const [leftText, setLeftText] = useState("A")
    const [rightText, setRightText] = useState("B")
    const [bottomText, setBottomText] = useState("C")
    const [canvasWidth, setCanvasWidth] = useState(
        window.innerWidth - 20
    )
    const [canvasHeight, setCanvasHeight] = useState(
        window.innerHeight - 240
    )
    useEffect(() => {
        window.onresize = (event) => {
            setCanvasWidth(event.target.innerWidth - 20)
            setCanvasHeight(event.target.innerHeight - 240)
        }
    },
    [])

    const drawCircle = (context, x, y, fillColor) => {
        // Reduce the opacity to make it kinda transparent,
        // namely rgba(r, g, b, 0.75) here,
        // so the color overlap can be seen
        context.fillStyle = `${fillColor}BF`
        context.beginPath()
        // Radius 100, start at 0, angle 2π (full circle)
        context.arc(x, y, 100, 0, 2 * Math.PI)
        context.fill()
    }

    const calculateTextCenter = (context, text) => {
        // Measure how much space the text takes,
        // and return the midpoint of that space
        return (context.measureText(text).width / 2)
    }
    //

    return <main>
        <canvas
            width={canvasWidth}
            height={canvasHeight}
        ></canvas>

        <span className="diagram-input">
            <label htmlFor="left-color-input">
                Left color
            </label>
            <input
                type="color"
                id="left-color-input"
                value={leftColor}
                onChange={(event) => {
                    setLeftColor(event.target.value)
                }}
            />
            <label htmlFor="left-text-input">
                Left text
            </label>
            <input
                type="text"
                id="left-text-input"
                value={leftText}
                // Restrict the text size,
                // to keep the diagram as legible as possible
                maxLength={2}
                onChange={(event) => {
                    setLeftText(event.target.value)
                }}
            />
        </span>
        
        <span className="diagram-input">
            <label htmlFor="right-color-input">
                Right color
            </label>
            <input
                type="color"
                id="right-color-input"
                value={rightColor}
                onChange={(event) => {
                    setRightColor(event.target.value)
                }}
            />
            <label htmlFor="right-text-input">
                Right text
            </label>
            <input
                type="text"
                id="right-text-input"
                value={rightText}
                maxLength={2}
                onChange={(event) => {
                    setRightText(event.target.value)
                }}
            />
        </span>

        <span className="diagram-input">
            <label htmlFor="bottom-color-input">
                Bottom color
            </label>
            <input
                type="color"
                id="bottom-color-input"
                value={bottomColor}
                onChange={(event) => {
                    setBottomColor(event.target.value)
                }}
            />
            <label htmlFor="bottom-text-input">
                Bottom text
            </label>
            <input
                type="text"
                id="bottom-text-input"
                value={bottomText}
                maxLength={2}
                onChange={(event) => {
                    setBottomText(event.target.value)
                }}
            />
        </span>
        <br />
        <button onClick={() => {
            let canvasElement = document.querySelector("canvas")
            let context = canvasElement.getContext("2d")
            context.fillStyle = "black"
            // Empty any previous canvas state
            context.fillRect(0, 0, canvasWidth, canvasHeight)
            // Save the default state of the "cursor",
            // so a new diagram may be drawn at the same position
            context.save()
            // Set the "cursor" at the center of the canvas
            context.translate(canvasWidth / 2, canvasHeight / 2)
            drawCircle(context, -50, -50, leftColor)
            drawCircle(context, 50, -50, rightColor)
            drawCircle(context, 0, 50, bottomColor)
            context.fillStyle = "black"
            context.font = "20px sans-serif"
            // Individual circle texts
            context.fillText(leftText, -100, -100)
            context.fillText(rightText, 100, -100)
            context.fillText(bottomText, 0, 100)
            // A union B
            const aUnionB = `${leftText}\u222A${rightText}`
            context.fillText(
                aUnionB,
                // Take the center between the two,
                // measure the width of the text (A ∪ B),
                // and set the halfpoint of that width,
                // as the starting point for the text
                0 - (calculateTextCenter(context, aUnionB)),
                -100
            )
            // A union C
            const aUnionC = `${leftText}\u222A${bottomText}`
            context.fillText(
                aUnionC,
                -50 - (calculateTextCenter(context, aUnionC)),
                // Push the text down a bit,
                // to make more space for the A ∪ B ∪ C text
                50
            )
            // B union C
            const bUnionC = `${rightText}\u222A${bottomText}`
            context.fillText(
                bUnionC,
                // May overflow a bit if the text is long,
                // but excessive checks may be out of scope here,
                // so just take the center between texts B and C
                calculateTextCenter(context, bUnionC),
                50
            )
            // A union B union C
            const abcUnion = leftText + "\u222A"
                + rightText + "\u222A" + bottomText
            context.fillText(
                abcUnion,
                0 - (calculateTextCenter(context, abcUnion)),
                -25
            )
            // Move the "cursor" back to the default position
            context.restore()
        }}>
            Draw diagram
        </button>
    </main>
} //

export default App
