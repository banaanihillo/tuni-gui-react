import React, {useState} from "react"
import "./App.css"
//
const App = () => {
    const [name, setName] = useState("")
    const [student, toggleStudent] = useState(false)
    const [persons, setPersons] = useState([])
    return <div>
        <form onSubmit={(event) => {
            event.preventDefault()
            if (!name) {
                return console.log("Input a name first.")
            }
            setName("")
            toggleStudent(false)
            setPersons(persons.concat({
                name,
                student,
                id: `${Math.random() * 100000000} banananananas`
            }))
        }}>
            <label htmlFor="name-input">
                Name
            </label>
            <input
                type="text"
                id="name-input"
                value={name}
                onChange={(event) => {
                    setName(event.target.value)
                }}
            />
            <br />
            <label htmlFor="student-checkbox">
                Student
            </label>
            <input
                type="checkbox"
                id="student-checkbox"
                checked={student}
                onChange={() => toggleStudent(!student)}
            />
            <br />
            <button type="submit">
                Add
            </button>
        </form>
        <hr />
        <table>
            <thead>
                <tr>
                    <th> Name </th>
                    <th> Student </th>
                </tr>
            </thead>
            <tbody>
                {persons.map(person => {
                    return <tr key={person.id}>
                        <td> {person.name} </td>
                        <td>
                            {(person.student)
                                ? "Is a student"
                                : "Not a student"
                            }
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default App
