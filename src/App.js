import React, {useState, useRef} from "react"
import "./App.css"


const App = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    let menuReference = useRef(null)
    let inputReference = useRef(null)
    let colorToggleReference = useRef(null)
    let fontSwitchReference = useRef(null)

    const toggleColor = (classList) => {
        if (classList.contains("background-secondary")) {
            classList.remove("background-secondary")
        } else {
            classList.add("background-secondary")
        }
    }

    const toggleFont = (classList) => {
        if (classList.contains("font-secondary")) {
            classList.remove("font-secondary")
        } else {
            classList.add("font-secondary")
        }
    }

    const closeMenu = () => {
        menuReference.current.style.display = "none"
        setMenuOpen(false)
    }

    const openMenu = (event) => {
        if (!menuOpen) {
            setMenuOpen(true)
            menuReference.current.style.display = "unset"
        }
        // Absolutely position the menu depending on cursor position
        menuReference.current.style.left = `${event.clientX}px`
        menuReference.current.style.top = `${event.clientY}px`
        // Allow the menu to be navigated via keyboard
        colorToggleReference.current.focus()
    }

    return <><main
        // Close the custom context menu by clicking on anywhere else
        onClick={() => {
            closeMenu()
        }}
        // Also close the custom context menu,
        // if the user opens a browser default context menu elsewhere
        onContextMenu={() => {
            if (menuOpen) {
                closeMenu()
            }
        }}
    >
        <label htmlFor="mysterious-input">
            Context menu
        </label>
        <input
            type="text"
            id="mysterious-input"
            ref={inputReference}
            onContextMenu={(event) => {
                event.preventDefault()
                // If the custom context menu is open,
                // and the user opens the custom context menu again,
                // (while still inside the input element),
                // prevent the firing of the parent element event,
                // which would close the custom context menu,
                // instead of opening it at a different position
                event.stopPropagation()
                openMenu(event)
            }}
        />
    </main>
    <nav
        ref={menuReference}
        onKeyDown={(event) => {
            switch (event.code) {
                // Esc should close the custom context menu,
                // just as the browser default does,
                // and bring the input element back to focus
                case "Escape":
                    closeMenu()
                    inputReference.current.focus()
                    break
                // The menu happens to only have two items,
                // so navigation upward/downward is the same thing
                case "ArrowUp":
                case "ArrowDown":
                    if (
                        document.activeElement.id
                        === colorToggleReference.current.id
                    ) {
                        fontSwitchReference.current.focus()
                    } else {
                        colorToggleReference.current.focus()
                    }
                    break
                // Navigation via Tab and Shift+Tab already works,
                // because the elements are clickable buttons
                default:
                    return
            }
        }}
    >
        <ul onContextMenu={(event) => {
            // If the custom context menu is already open,
            // prevent opening a browser default menu on top of it,
            // as that would probably complicate things further
            event.preventDefault()
        }}>
            <li>
                <button
                    ref={colorToggleReference}
                    id="toggle-color"
                    onClick={() => {
                        toggleColor(inputReference.current.classList)
                        // Close the custom context menu,
                        // and re-focus the input element,
                        // after an option has been clicked
                        closeMenu()
                        inputReference.current.focus()
                    }}
                >
                    Invert colors
                </button>
            </li>
            <li>
                <button
                    ref={fontSwitchReference}
                    id="switch-font"
                    onClick={() => {
                        toggleFont(inputReference.current.classList)
                        closeMenu()
                        inputReference.current.focus()
                    }}
                >
                    Switch font
                </button>
            </li>
        </ul>
    </nav></>
}

export default App
