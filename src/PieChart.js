import React, {useRef, useEffect} from 'react'

const PieChart = (props) => {
    const propData = props.data
	const [fontSize, setFontSize] = React.useState(16)
	
	const canvasRef = useRef(null)
	
	const adjustFontSize = (change) => {
		setFontSize(Math.max(5, fontSize + change))
	}
	
	useEffect(() => {
		let context = canvasRef.current.getContext("2d")
		let width = context.canvas.width
		let height = context.canvas.height
		context.clearRect(0, 0, width, height)
		let total = 0
		for (const datum of propData) {
			total += datum.value
		}
		context.save()

		context.translate(
            width / 2,
            height / 2
        )
		let radius = Math.min(width, height) * 0.4
		context.textAlign = "center"
		context.textBaseline = "middle"
		context.font = fontSize + "px sans-serif"
		let startAngle = 0
        
		for (const datum of propData) {
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
		for (const datum of propData) {
			let angle = (
                Math.PI
                * 2
                / total
                * datum.value
            )
			context.fillText(
                datum.name,
                Math.cos(startAngle + angle / 2) * radius/4*3,
                Math.sin(startAngle + angle / 2) * radius/4*3
            )
			startAngle += angle
		}
		context.restore()
	},
    [fontSize, propData])
	
	return (
		<div>
			<canvas
                width={300}
                height={300}
                ref={canvasRef}
                // why do you need to disable the context menu?
                //onContextMenu={handleClick}
            />
            
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
		</div>
	)
}

export default PieChart
