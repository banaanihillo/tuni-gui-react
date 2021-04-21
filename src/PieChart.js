import React, {useState, useRef, useEffect} from 'react'

const PieChart = (props) => {
    const {data, setData} = props
	const [fontSize, setFontSize] = React.useState(16)
    const [newValue, setNewValue] = useState(50)
    const [newName, setNewName] = useState("")
	
	const canvasRef = useRef(null)
	
	const adjustFontSize = (change) => {
		setFontSize(Math.max(5, fontSize + change))
	}

    const handleSubmit = (event) => {
        event.preventDefault()
        if (data.find(datum => datum.name === newName)) {
            return console.log("That name already exists")
        } else if (!newName) {
            return console.log("You should provide a name")
        }
        setData([
            ...data,
            {
                name: newName,
                value: Number(newValue)
            }
        ])
        setNewValue(50)
        setNewName("")
    }
	
	useEffect(() => {
        console.log(data)
		let context = canvasRef.current.getContext("2d")
		let width = context.canvas.width
		let height = context.canvas.height
		context.clearRect(0, 0, width, height)
		let total = 0
		for (const datum of data) {
			total += datum.value
		}
		context.save()
        console.log(total)
		context.translate(
            width / 2,
            height / 2
        )
		let radius = Math.min(width, height) * 0.4
		context.textAlign = "center"
		context.textBaseline = "middle"
		context.font = fontSize + "px sans-serif"
		let startAngle = 0
        
		for (const datum of data) {
			let angle = (
                Math.PI
                * 2
                / total
                * datum.value
            )
			context.beginPath()
			context.moveTo(0, 0)
			context.arc(
                0,
                0,
                radius,
                startAngle,
                startAngle + angle
            )
            // Random red, green and blue between 0-255,
            // and an opacity of 75%,
            // to preserve adequate contrast with the text
			context.fillStyle = `rgba(
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)},
                0.75
            )`
			context.fill()
			context.stroke()
            context.fillStyle = "white"
			startAngle += angle
		}

		startAngle = 0
		for (const datum of data) {
			let angle = (
                Math.PI
                * 2
                / total
                * datum.value
            )
			context.fillText(
                datum.name,
                Math.cos(startAngle + angle / 2) * radius / 4 * 3,
                Math.sin(startAngle + angle / 2) * radius / 4 * 3
            )
			startAngle += angle
		}
		context.restore()
	},
    [fontSize, data])
	
	return (
		<div>
			<canvas
                width={300}
                height={300}
                ref={canvasRef}
                // why do you need to disable the context menu?
                //onContextMenu={handleClick}
            />

            <span className="options-container">
                <form onSubmit={handleSubmit}>
                    <span className="input-container">
                        <label htmlFor="value-input"> Value </label>
                        <input
                            id="value-input"
                            type="range"
                            min={1}
                            max={100}
                            step={1}
                            value={newValue}
                            onChange={(event) => {
                                setNewValue(event.target.value)
                            }}
                        />
                        <output> {newValue} </output>
                    </span>
                    <span className="input-container">
                        <label htmlFor="name-input"> Name </label>
                        <input
                            id="name-input"
                            type="text"
                            placeholder="Name"
                            value={newName}
                            onChange={(event) => {
                                setNewName(event.target.value)
                            }}
                        />
                    </span>
                    <button type="submit">
                        Add
                    </button>
                </form>
                
                <span className="button-container">
                    <button onClick={() => {
                        adjustFontSize(2)
                    }}>
                        Increase text size
                    </button>
                    <button onClick={() => {
                        adjustFontSize(-2)
                    }}>
                        Decrease test[sic] size
                    </button>
                </span>
            </span>
		</div>
	)
}

export default PieChart
