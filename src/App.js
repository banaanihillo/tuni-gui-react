import React, {useState} from "react"
import "./App.css"
import canadianDollarRates from "./FX_RATES_DAILY-sd-2021-04-09.json"

const App = () => {
    const [EURtoCAD, toggleEURtoCAD] = useState(true)
    const [amountToConvert, setAmountToConvert] = useState(1.00)
    const today = new Date()
        .toISOString()
        .slice(0, 10)
    // Take the latest observation from the provided JSON file
    const EURtoCADRate = canadianDollarRates.observations[0].FXEURCAD.v
    const canadianDollars = Intl.NumberFormat(
        "en-CA",
        {
            style: "currency",
            currency: "CAD"
        }
    )//
    const euros = Intl.NumberFormat(
        "fi-FI",
        {
            style: "currency",
            currency: "EUR"
        }
    )//

    return <main>
        <section>
            <label htmlFor="amount-to-convert-input">
                Amount
            </label>
            <input
                type="number"
                id="currency-to-convert-input"
                min={0}
                step={0.01}
                value={amountToConvert}
                onChange={(event) => {
                    setAmountToConvert(Number(event.target.value))
                }}
            />
            <fieldset>
                <legend> Conversion direction </legend>
                <input
                    type="radio"
                    id="eur-to-cad-input"
                    name="conversion-direction"
                    checked={EURtoCAD}
                    onChange={() => toggleEURtoCAD(!EURtoCAD)}
                />
                <label htmlFor="eur-to-cad-input">
                    € to $
                </label>
                <br />
                <input
                    type="radio"
                    id="cad-to-eur-input"
                    name="conversion-direction"
                    checked={!EURtoCAD}
                    onChange={() => {toggleEURtoCAD(!EURtoCAD)}}
                />
                <label htmlFor="cad-to-eur-input">
                    $ to €
                </label>
            </fieldset>
        </section>
        <output>
            <p>
                Exchange rate at {today}
            </p>
            {(EURtoCAD)
                ? <p>
                    {euros.format(amountToConvert)} = {
                        canadianDollars
                            .format(amountToConvert * EURtoCADRate)
                    }
                </p>
                : <p>
                    {canadianDollars.format(amountToConvert)} = {
                        euros
                            .format(amountToConvert / EURtoCADRate)
                    }
                </p>
            }
            <cite>
                Source: <a
                    href={`https://www.bankofcanada.ca/valet/observations/group/FX_RATES_DAILY/json?start_date=${today}`}
                >
                    Bank of Canada, FX Rates Daily
                </a>
            </cite>
        </output>
    </main>
}

export default App
