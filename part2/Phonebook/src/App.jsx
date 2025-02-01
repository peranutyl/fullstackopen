import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import Note from './components/Note'

// const Course = ({courses}) => {
//   return (
//     <div>{courses.map( course => (<div key ={course.id}>
//     <Header course={course.name}/>
//     <Content parts={course.parts}/>
//     <Total parts={course.parts}/>
//     </div>))}

//     </div>
//   )
// }

// const Header = ({course}) => {
//   return (
//     <div>
//       <h1>{course}</h1>
//     </div>
//   )
// }
// const Content = ({parts}) => {
//   return (
//     <div>
//       {
//         parts.map((part) => (<Part key={part.id} part={part.name} exercise={part.exercises}/>))
//       }
//     </div>

//   )
// }
// const Part =({part, exercise}) => {
//   return (
//     <p>{part} {exercise}</p>
//   )
// }
// const Total = ({parts}) => {
//   return (
//     <p>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
//   )
// }
// const App = (props) => {
//   const courses = [
//     {
//       name: 'Half Stack application development',
//       id: 1,
//       parts: [
//         {
//           name: 'Fundamentals of React',
//           exercises: 10,
//           id: 1
//         },
//         {
//           name: 'Using props to pass data',
//           exercises: 7,
//           id: 2
//         },
//         {
//           name: 'State of a component',
//           exercises: 14,
//           id: 3
//         },
//         {
//           name: 'Redux',
//           exercises: 11,
//           id: 4
//         }
//       ]
//     }, 
//     {
//       name: 'Node.js',
//       id: 2,
//       parts: [
//         {
//           name: 'Routing',
//           exercises: 3,
//           id: 1
//         },
//         {
//           name: 'Middlewares',
//           exercises: 7,
//           id: 2
//         }
//       ]
//     }
//   ]
// const [notes, setNotes] = useState(props.notes)
// const [newNote, setNewNote] = useState(    'a new note...'  ) 
// const [showAll, setShowAll] = useState(true)
// const addNote = (event) => {    
//   event.preventDefault()    
//   const noteObject = {
//     id : String(notes.length + 1),
//     content : newNote,
//     important : Math.random() < 0.5
//   }
//   setNotes(notes.concat(noteObject))
//   setNewNote("")
//   console.log('button clicked', event.target)  }

// const handleNoteChange = (event) => {    
//   console.log(event.target.value)    
//   setNewNote(event.target.value)  } 

// const notesToShow = showAll 
// ? notes 
// : notes.filter(note => note.important)
// //return <Course courses={courses} />
//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notesToShow.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <button onClick={() => setShowAll(!showAll)}>{showAll ? "important": "all"}</button>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange} />
//         <button type="submit">save</button>
//       </form>   
//     </div>
//   )
// }
// export default App

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notifcation'
import servicePersons from './service/Phonebook'
const App = () => {
  const hook = () => {
    servicePersons.getAll()
    .then(allPersons => {
      setPersons(allPersons)})}
  useEffect(hook, [])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotification, setNotification] = useState(null)

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const numberObject = {
      name : newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)){
      if (window.confirm(`${newName} is already in the phonebook, replace old number with old?`)){
        const updatingPerson = persons.filter(person => person.name === newName)[0]
        servicePersons.updatePerson(updatingPerson.id, numberObject)
        .then(updatePerson => {
          const updatedPersons = persons.map(person => person === updatingPerson ? updatePerson: person)
          setPersons(updatedPersons)
        })
        .catch(error => {
          setNotification(`Error: ${newName} has been removed`)
          setTimeout(()=>setNotification(null), 5000)
        }
        )
      }
      return
    }
    servicePersons.addPerson(numberObject)
      .then(addedPerson => {setPersons(persons.concat(addedPerson))
        setNewName("")
        setNewNumber("")
        setNotification(`Added to Phonebook : ${addedPerson.name}`)
        setTimeout(()=>setNotification(null), 5000)
      })
    

  }

  const deletePerson = (id) => {
    if (window.confirm(`delete ${persons.filter(person => person.id === id)[0].name}?`)){
      servicePersons.deletePerson(id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(person => !(person.id === response.id)))
      })
    }

  }

  return (
    <div>
      <Notification message={newNotification}></Notification>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={(event) => setNewFilter(event.target.value)}></Filter>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={(event) => setNewNumber(event.target.value)}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}></Persons>

      <div>debug: {newName}</div>
    </div>
  )
}

export default App