import React, {useState, useEffect, useRef} from "react"
import "./App.css"
//
const App = () => {//
    const [canvasWidth, setCanvasWidth] = useState(
        window.innerWidth - 20
    )//
    const [canvasHeight, setCanvasHeight] = useState(
        window.innerHeight - 40
    )
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null
    })
	const canvasReference = useRef(null);

    useEffect(() => {//
        window.onresize = (event) => {
            setCanvasWidth(event.target.innerWidth - 20)
            setCanvasHeight(event.target.innerHeight - 40)
        }
    },
    [canvasWidth, canvasHeight])
	
	const setMouseCoordinates = (event) => {
		setMousePosition({
            x: event.clientX,
            y: event.clientY
        })
	}

    const drawCircle = (context, x, y, radius, angle) => {
        context.moveTo(0, 0)
        context.beginPath()
        context.arc(x, y, radius, 0, angle)
        context.stroke()
    }
	
	useEffect(() => {
		let context = canvasReference.current.getContext('2d');
		if (!mousePosition.x && !mousePosition.y) {
			return
        }
		// width an[d] height are used in various places,
        // store them in these variables to shorten the following code
		let [w, h] = [
            canvasReference.current.width,
            canvasReference.current.height
        ]

		// clear canvas
        context.fillStyle = "#2E3561";
        context.fillRect(0, 0, w, h);
        context.strokeStyle = "white";
        context.fillStyle = "white";
		
		// calculate the angle from the center to the mouse point,
        // value is in radians,
        // as are all values to and from Math trigonometric functions
		let angle = Math.atan2(
            mousePosition.y - h / 2,
            mousePosition.x - w / 2
        )

		context.save();
		context.translate(w / 2, h / 2);
		drawCircle(context, 0, 0, 50, 2 * Math.PI);
        drawCircle(context, -20, -10, 10, 2 * Math.PI)
        drawCircle(context, 20, -10, 10, 2 * Math.PI)
        context.fillStyle = "white"
        drawCircle(context, -20, -10, 5, angle)
        context.fill()
        drawCircle(context, 20, -10, 5, angle)
        context.fill()
		context.restore();
	},
    [mousePosition])
    
	return (
        <canvas
            width={canvasWidth}
            height={canvasHeight}
            ref={canvasReference}
            onMouseMove={setMouseCoordinates}
        />
	)
}//

export default App
