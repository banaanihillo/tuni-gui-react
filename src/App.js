import React, {useState} from "react"
import "./App.css"
// Public domain, via pikist.com
import torontoSkyline from "./toronto-skyline-500x330.jpg"
// Also public domain, via photos-public-domain.com
import orangeSunset from "./orange-sunset-with-trees-600x400.jpg"

const App = () => {
    const [image, setImage] = useState(torontoSkyline)
    return <main>
        <img
            src={image}
            width={500}
            height={330}
            alt="The skyline of Toronto, with Rogers Centre and the CN Tower in the forefront"
            onDrop={(event) => {
                event.preventDefault()
                let file = event.dataTransfer.files[0]
                if (file && file.type === "image/jpeg") {
                    let fileReader = new FileReader()
                    fileReader.onloadend = () => {
                        setImage(fileReader.result)
                    }
                    fileReader.readAsDataURL(file)
                }
            }}
            onDragOver={(event) => {
                event.preventDefault()
                event.dataTransfer.dropEffect = "copy"
            }}
        />
        <hr /> 
        <figure>
            <figcaption>
                Try dragging this image from the source folder,
                or any jpeg image, really, <br />
                onto the existing Toronto skyline image
            </figcaption>
            <img
                src={orangeSunset}
                alt="Dark outlines of trees showered by the light of the setting Sun"
            />
            <p>
                As for the above image itself - <br />
                It is purely decorational,
                just acting as a reminder that you may freely test the functionality with the existing image in the source folder
            </p>
            <footer>
                The images used are in the public domain.
            </footer>
        </figure>
    </main> 
}

export default App
