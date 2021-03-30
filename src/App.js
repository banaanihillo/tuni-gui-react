import React, {
    useState,
    useEffect,
    useRef as useReference
} from "react"
import "./App.css"
//
const App = () => {
    // Let the canvas breathe just a bit,
    // to avoid a one-pixel overflow and scrollbars
    const [canvasWidth, setCanvasWidth] = useState(
        window.innerWidth - 20
    )
    // Also make some space for the buttons
    const [canvasHeight, setCanvasHeight] = useState(
        window.innerHeight - 100
    )
    const [houseWidth, setHouseWidth] = useState(10)
    const [houseHeight, setHouseHeight] = useState(10)
    const canvasReference = useReference(null)

    useEffect(() => {
        // Re-set the canvas width and height,
        // whenever the user modifies the window size
        window.onresize = (event) => {
            setCanvasWidth(event.target.innerWidth - 20)
            setCanvasHeight(event.target.innerHeight - 100)
        }
    },
    [canvasReference])

    const paintHouse = (width, height) => {
        // Place the house at a random point,
        // between (0, 0) and (canvasWidth, canvasHeight)
        const randomX = Math.round(
            Math.random() * canvasWidth
        )
        const randomY = Math.round(
            Math.random() * canvasHeight
        )
        let context = canvasReference.current.getContext("2d")
        context.strokeStyle = "magenta"
        context.fillStyle = "magenta"
        context.fillRect(
            randomX,
            randomY,
            width,
            height
        )
        let path = new Path2D()
        // Paint the roof from the top-left corner of the rectangle,
        path.moveTo(randomX, randomY)
        // turning around at half the width and height,
        path.lineTo(
            randomX + (width / 2),
            randomY - (height / 2)
        )
        // and finishing at the full width of the rectangle,
        // and at the same height the roof started from
        path.lineTo(
            randomX + width,
            randomY
        )
        path.closePath()
        context.fillStyle = "deeppink"
        context.fill(path)
    }

    return <span>
        <main>
            <canvas
                ref={canvasReference}
                width={canvasWidth}
                height={canvasHeight}
            ></canvas>
            <span className="button-container">
                <button onClick={() => {
                    paintHouse(50, 50)
                }}>
                    Add a symmetric house
                </button>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    paintHouse(houseWidth, houseHeight)
                }}>
                    <span className="input-container">
                        <label htmlFor="width-input">
                            Width
                        </label>
                        <input
                            type="number"
                            min={10}
                            max={100}
                            id="width-input"
                            value={houseWidth}
                            title="Width between 10 and 100 pixels"
                            onChange={(event) => {
                                setHouseWidth(
                                    Number(event.target.value)
                                )
                            }}
                        />
                        <br />
                        <label htmlFor="height-input">
                            Height
                        </label>
                        <input
                            type="number"
                            min={10}
                            max={100}
                            id="height-input"
                            value={houseHeight}
                            title="Height between 10 and 100 pixels"
                            onChange={(event) => {
                                setHouseHeight(
                                    Number(event.target.value)
                                )
                            }}
                        />
                    </span>
                    <button type="submit">
                        Add a wacky house
                    </button>
                </form>
                <button
                    type="cancel"
                    onClick={() => {
                        let context = canvasReference.current
                            .getContext("2d")
                        context.clearRect(
                            0,
                            0,
                            canvasWidth,
                            canvasHeight
                        )
                    }}
                >
                    Clear canvas
                </button>
            </span>
        </main>
        <footer></footer>
    </span>
}

export default App
