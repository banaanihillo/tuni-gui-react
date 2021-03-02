import React from "react"
import "./App.css"

const App = () => {

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
                    />
                    <input
                        type="checkbox"
                        id="scroll-wheel-distance"
                    />

                    <label htmlFor="mouse-speed"> Speed </label>
                    <input
                        type="checkbox"
                        id="mouse-speed"
                    />
                    <input
                        type="checkbox"
                        id="scroll-wheel-speed"
                    />
                </article>
                <article className="mouse-information-container">
                    <p>
                        Check/uncheck the checkboxes,
                        and see how the figure reacts.
                    </p>
                    <button>
                        Reset distances
                    </button>
                </article>
            </section>
            <figure className="mouse-event-figure">
                <canvas className="mouse-event-canvas"></canvas>
                <figcaption>
                    See mouse events above
                </figcaption>
            </figure>
        </main>
    )
}

export default App
