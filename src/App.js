import React, {useState, useEffect} from "react"
import "./App.css"
import fxRates from "./FX_RATES_DAILY-sd-2021-04-01.json"

const App = () => {
    const [conversionTo, setConversionTo] = useState("EUR")
    const [numberFormat, setNumberFormat] = useState(Intl.NumberFormat(
        "en-CA",
        {
            style: "currency",
            currency: conversionTo
        }
    ))
    const [canvasContext, setCanvasContext] = useState(null)

    // Take the observation in {"d": "YYYY-MM-DD"} format,
    let canadianDollarRates = fxRates.observations
        .map(observation => {
            return Object.entries(observation).map(([key, value]) => {
                // and return the date by itself,
                if (key === "d") {
                    return value
                } else {
                    return {
                        // and reformat from eg. {FXKRWCAD: rate},
                        // to {KRW: rate}
                        [key.substring(2, 5)]: value.v
                    }
                }
            })
        })
    const observationDates = canadianDollarRates.map((rate) => {
        // Take the date from [["date", {rates}, ..., {rates}]]
        return rate[0]
    })
    canadianDollarRates = canadianDollarRates.map((ratesByDate) => {
        return ratesByDate.filter((rate) => {
            // Exclude the date that was already extracted
            return (typeof rate !== "string")
        })
    })

    useEffect(() => {
        if (!canvasContext) {
            let canvas = document.getElementById("currency-chart")
            let context = canvas.getContext("2d")
            context.fillStyle = "magenta"
            context.strokeStyle = "magenta"
            // All the texts are of the same width
            const textWidth = (
                context.measureText(observationDates[0])
            ).width
            for (let i = 0; i < observationDates.length; i++) {
                context.fillText(
                    observationDates[i],
                    // Add some space before the first text,
                    // and in between each text
                    20 + (i * (textWidth + 20)),
                    10
                )
            }
            setCanvasContext(context)
        }
    },
    [canvasContext, observationDates])

    useEffect(() => {
        setNumberFormat(Intl.NumberFormat(
            "en-CA",
            {
                style: "currency",
                currency: conversionTo
            }
        ))
    },
    [conversionTo])

    console.log(numberFormat.format(1))

    return <main>
        <figure>
            <figcaption> Exchange rate (CAD) </figcaption>
            <canvas
                id="currency-chart"
                // Use a static width,
                // in order to line up the dates with the chart,
                // without any additional hassle
                width={800}
                height={200}
                onMouseMove={(event) => {
                    // Hover over a certain point of the chart,
                    // to bring up a tooltip of the exact rate
                    console.log(event.clientX)
                }}
            ></canvas>
        </figure>
        <label htmlFor="currency-input"> Currency: </label>
        <br />
        <select
            id="currency-input"
            value={conversionTo}
            onChange={(event) => {
                setConversionTo(event.target.value)
            }}
        >
            {/* Use any of the rates to just get the currencies */}
            {canadianDollarRates[0].map((rate) => {
                // value not needed here
                const [key, ] = Object.entries(rate)[0]
                return <option key={key}>
                    {key}
                </option>
            })}
        </select>
    </main>
}

export default App
