import React, {useState, useEffect} from "react"
import "./App.css"

const App = () => {
    const [mouseDistanceEnabled, toggleMouseDistance] = useState(false)
    const [
        scrollWheelDistanceEnabled,
        toggleScrollWheelDistance
    ] = useState(false)
    const [mouseSpeedEnabled, toggleMouseSpeed] = useState(false)
    const [
        scrollWheelSpeedEnabled,
        toggleScrollWheelSpeed
    ] = useState(false)
    const [mouseDistance, setMouseDistance] = useState({
        x: 0,
        y: 0
    })
    const [scrollWheelDistance, setScrollWheelDistance] = useState(0)
    const [mouseSpeed, setMouseSpeed] = useState(0)
    const [scrollWheelSpeed, setScrollWheelSpeed] = useState(0)
    const [
        previousCoordinates,
        setPreviousCoordinates
    ] = useState(null)
    const [timeElapsed, setTimeElapsed] = useState(1)
    const [timerOn, toggleTimer] = useState(true)

    useEffect(() => {
        if (timerOn) {
            const timeoutIdentifier = setTimeout(() => {
                setTimeElapsed(timeElapsed + 1)
            }, 1000)
            return () => {
                clearTimeout(timeoutIdentifier)
            }
        }
    },
    [timeElapsed, timerOn])

    const onMouseMove = (event) => {
        toggleTimer(true)
        if (previousCoordinates) {
            setMouseDistance({
                x: mouseDistance.x + Math.abs(
                    previousCoordinates.x
                    - event.clientX
                ),
                y: mouseDistance.y + Math.abs(
                    previousCoordinates.y
                    - event.clientY
                )
            })
            setMouseSpeed(Math.floor(
                (mouseDistance.x + mouseDistance.y)
                / timeElapsed
            ))
        }
        setPreviousCoordinates({
            x: event.clientX,
            y: event.clientY
        })
    }

    const onWheel = (event) => {
        setScrollWheelDistance((prevState) => {
            return (prevState + Math.abs(event.deltaY))
        })
        setScrollWheelSpeed(Math.floor(
            scrollWheelDistance / timeElapsed
        ))
    }

    /*
    The specification separates the listeners into four,
    however, it does seem much more logical to group them together,
    since velocity is directly related to distance,
    essentially leading to two listeners - mousemove and wheel,
    which are removed only when both speed and distance are disabled
    */
    const toggleListeners = (() => {
        const canvasElement = document.querySelector("canvas")
        if (!mouseDistanceEnabled && !mouseSpeedEnabled) {
            canvasElement.removeEventListener("mousemove", onMouseMove)
        }
        if (!scrollWheelDistanceEnabled && !scrollWheelSpeedEnabled) {
            canvasElement.removeEventListener("wheel", onWheel)
        }
    })

    return (
        <main>
            <section className="mouse-container">
                <article className="mouse-checkbox-container">
                    {/*
                    The labels in the example look kinda funky,
                    almost makes one think of a table,
                    which is not really the most preferable way -
                    it would be better in terms of user experience,
                    to instead give each checkbox a unique label,
                    for easier access to the input;
                    screen readers follow them consistently,
                    and mouse/touch users have a larger area to target
                    */}
                    <label className="grid-label">
                        <b> Events </b>
                    </label>

                    <label> Mouse </label>
                    <label> Scroll wheel </label>
                    <label htmlFor="mouse-distance"> Distance </label>

                    <input
                        type="checkbox"
                        id="mouse-distance"
                        value={mouseDistanceEnabled}
                        onClick={() => {
                            toggleMouseDistance(!mouseDistanceEnabled)
                            toggleListeners()
                        }}
                    />
                    <input
                        type="checkbox"
                        id="scroll-wheel-distance"
                        value={scrollWheelDistanceEnabled}
                        onClick={() => {
                            toggleScrollWheelDistance(
                                !scrollWheelDistanceEnabled
                            )
                            toggleListeners()
                        }}
                    />

                    <label htmlFor="mouse-speed"> Speed </label>
                    <input
                        type="checkbox"
                        id="mouse-speed"
                        value={mouseSpeedEnabled}
                        onClick={() => {
                            toggleMouseSpeed(!mouseSpeedEnabled)
                            toggleListeners()
                        }}
                    />
                    <input
                        type="checkbox"
                        id="scroll-wheel-speed"
                        value={scrollWheelSpeedEnabled}
                        onClick={() => {
                            toggleScrollWheelSpeed(
                                !scrollWheelSpeedEnabled
                            )
                            toggleListeners()
                        }}
                    />
                </article>
                <article className="mouse-information-container">
                    {(mouseDistanceEnabled)
                    ? <p>
                        Mouse distance: {
                            mouseDistance.x + mouseDistance.y
                        }
                    </p>
                    : <p>
                        Mouse distance is not in use.
                    </p>
                    }

                    {(scrollWheelDistanceEnabled)
                    ? <p>
                        Scroll wheel distance: {scrollWheelDistance}
                    </p>
                    : <p>
                        Scroll wheel distance is not in use.
                    </p>
                    }

                    {(mouseSpeedEnabled)
                    ? <p>
                        Mouse velocity: {mouseSpeed}
                    </p>
                    : <p>
                        Mouse velocity is not in use.
                    </p>
                    }

                    {(scrollWheelSpeedEnabled)
                    ? <p>
                        Scroll wheel velocity: {scrollWheelSpeed}
                    </p>
                    : <p>
                        Scroll wheel velocity is not in use.
                    </p>
                    }

                    <button onClick={() => {
                        setMouseSpeed(0)
                        setMouseDistance({
                            x: 0,
                            y: 0
                        })
                        setScrollWheelSpeed(0)
                        setScrollWheelDistance(0)
                        setPreviousCoordinates(null)
                        toggleTimer(false)
                        setTimeElapsed(1)
                    }}>
                        Reset distances
                    </button>
                </article>
            </section>
            <figure className="mouse-event-figure">
                <canvas
                    className="mouse-event-canvas"
                    onMouseMove={onMouseMove}
                    onWheel={onWheel}
                ></canvas>
                <figcaption>
                    Use the canvas above for the mouse events
                </figcaption>
            </figure>
        </main>
    )
}

export default App
