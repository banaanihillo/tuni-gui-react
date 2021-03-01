import React, {useState} from "react"
import "./App.css"

const App = () => {
    const [bitSeven, toggleBitSeven] = useState(0)
    const [bitSix, toggleBitSix] = useState(0)
    const [bitFive, toggleBitFive] = useState(0)
    const [bitFour, toggleBitFour] = useState(0)
    const [bitThree, toggleBitThree] = useState(0)
    const [bitTwo, toggleBitTwo] = useState(0)
    const [bitOne, toggleBitOne] = useState(0)
    const [bitZero, toggleBitZero] = useState(0)
    const bits = String(bitSeven)
        + String(bitSix)
        + String(bitFive)
        + String(bitFour)
        + String(bitThree)
        + String(bitTwo)
        + String(bitOne)
        + String(bitZero)
    const [decimal, setDecimal] = useState(0)

    return (
        <main>
            <section className="checkbox-container">
                <input
                    type="checkbox"
                    value={bitSeven}
                    onChange={() => toggleBitSeven(bitSeven ? 0 : 1)}
                />
                <input
                    type="checkbox"
                    value={bitSix}
                    onChange={() => toggleBitSix(bitSix ? 0 : 1)}
                />
                <input
                    type="checkbox"
                    value={bitFive}
                    onChange={() => toggleBitFive(bitFive ? 0 : 1)}
                />
                <input
                    type="checkbox"
                    value={bitFour}
                    onChange={() => toggleBitFour(bitFour ? 0 : 1)}
                />
                <input
                    type="checkbox"
                    value={bitThree}
                    onChange={() => toggleBitThree(bitThree ? 0 : 1)}
                />

                <input
                    type="checkbox"
                    value={bitTwo}
                    onChange={() => toggleBitTwo(bitTwo ? 0 : 1)}
                />

                <input
                    type="checkbox"
                    value={bitOne}
                    onChange={() => toggleBitOne(bitOne ? 0 : 1)}
                />

                <input
                    type="checkbox"
                    value={bitZero}
                    onChange={() => toggleBitZero(bitZero ? 0 : 1)}
                />
            </section>
            <section className="number-container">
                <p>
                    {bits}                
                </p>
                <button onClick={() => setDecimal(parseInt(bits, 2))}>
                    Convert
                </button>
                <p>
                    {decimal}
                </p>
            </section>
        </main>
    )
}

export default App
