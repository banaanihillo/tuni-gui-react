let startFrom = 0
let latest = null
let primes = []
let running = false

onmessage = function(message) {
	if (message.data.primesFrom) {
		startFrom = message.data.primesFrom
        running = true
		findPrime()
	}
    if (message.data.stop) {
        // Once the worker is stopped,
        // send all the primes in one message
        running = false
    }
}

function findPrime() {
    // While the worker is running,
    // send each individual prime as a message,
    if (running) {
        latest = nextPrime(
            latest !== null ? (latest + 1) : startFrom
        )
        postMessage({
            prime: latest
        })
        primes.push(latest)
        setTimeout(
            findPrime,
            1
        )
    // and once all the primes until primesTo have been found,
    // send a message containing all the primes
    } else {
        postMessage({
            primes
        })
    }
}

function nextPrime(after) {
    // what's a pc? Program Counter?
	let pc = (
        // do you really mean double equals?
        // are you expecting "after" to be a string?
        after % 2 === 0 ? after + 1 : after
    )
	while (!isPrime(pc)) {
		pc += 2
    }
	return pc
}

function isPrime(n) {
    // what's a dv? something to do with division?
	let dv = Math.ceil(Math.sqrt(n))
	while (dv > 2) {
        // do you really mean double equals again?
		if (n % dv === 0)
			return false
		dv--
	}
	return true
}
