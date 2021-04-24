import React, {useState} from "react"
import "./App.css"


const App = () => {
    const [prime, setPrime] = useState(null)
    const [primes, setPrimes] = useState([])
    const [primesFrom, setPrimesFrom] = useState(3)
    const [primesTo, setPrimesTo] = useState(5)

    const findPrimes = () => {
        setPrimes([])
        setPrime(null)
        // Do nothing on incorrect input
        if (primesFrom > primesTo) {
            return
        }
        let primeFinder = new Worker("primesFinder.js")
        primeFinder.postMessage({
            primesFrom,
            primesTo
        })
        // lowercase m? really?
        primeFinder.onmessage = (message) => {
            // Once the execution is complete,
            // store all the primes in state
            if (message.data.primes) {
                // If there's just one prime,
                // skip all the hassle,
                // and just handle it like a single prime
                if (message.data.primes.length === 1) {
                    // Make sure there's no funky business,
                    // such as (primesFrom=6, primesTo=6) returning 7
                    if (
                        message.data.primes[0] === primesFrom
                        || message.data.primes[0] === primesTo
                    ) {
                        setPrime(message.data.primes[0])
                    }
                    return
                }
                // Handle the off-by-one error,
                // due to the prime >= primesTo comparison,
                // returning the original message primes,
                // if the primesTo parameter itself is prime,
                if (
                    message.data.primes[message.data.primes.length - 1]
                    === primesTo
                ) {
                    setPrimes(message.data.primes)
                } else {
                    // and if the primesTo parameter is not a prime,
                    // fix the extra prime after the fact
                    setPrimes(
                        message.data.primes.slice(
                            0,
                            message.data.primes.length - 1
                        )
                    )
                }
                return
            }
            if (message.data.prime >= primesTo) {
                // Once the last prime is found,
                // tell the worker to stop
                primeFinder.postMessage({
                    stop: true
                })
                return
            }
            if (message.data.prime) {
                // Receive an individual prime,
                // while the worker is still running
                setPrime(message.data.prime)
                return
            }
        } //
    }

    return <main>
        <form onSubmit={(event) => {
            event.preventDefault()
            findPrimes()
        }}>
            <header> Prime numbers </header>
            <label>
                <span> From </span>
                <input
                    type="number"
                    value={primesFrom}
                    min={3}
                    max={9001}
                    onChange={(event) => {
                        setPrimesFrom(Number(event.target.value))
                    }}
                />
            </label>
            <label>
                <span> To </span>
                <input
                    type="number"
                    value={primesTo}
                    min={5}
                    max={99999}
                    onChange={(event) => {
                        setPrimesTo(Number(event.target.value))
                    }}
                />
            </label>
            <button type="submit">
                Find
            </button>
        </form>
        <output>
            {(primes.length > 1)
                ? <ul>
                    {primes.map((prime, index) => {
                        return <li key={index}>
                            {prime}
                        </li>
                    })}
                </ul>
                : <p>
                    {(prime)
                        ? prime
                        : "Click on Find to find primes"
                    }
                </p>
            }
        </output>
    </main> //
}

export default App
