import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Note from './components/Note'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

promise.then(response => {
  console.log(response)
})

const App = () => {

const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState(    'a new note...'  ) 
const [showAll, setShowAll] = useState(true)
const [addedMessage, setAddedMessage] = useState(null)

const hook = () => {
  console.log('effect')
  noteService.getAll()
    .then(initialNotes => {
      console.log('promise fulfilled')
      setNotes(initialNotes)
    })
}

useEffect(hook, [])
console.log('render', notes.length, 'notes')
  
const toggleImportanceOf = (id) => {console.log(`importance of ${id} needs to be toggled`)
  const note = notes.find(n => n.id === id)
  const changedNote =  {...note, important:!note.important}
  console.log(changedNote)
  noteService.update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(n => n.id === id ? returnedNote : n))
    })
    
  }

const addNote = (event) => {    
  event.preventDefault()    
  const noteObject = {
    content : newNote,
    important : Math.random() < 0.5
  }
  noteService.create(noteObject)
    .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
      setAddedMessage('Added Note')
      setTimeout(() => {    
        setAddedMessage(null)        
      }, 5000)
    })
  console.log('button clicked', event.target)  }

const handleNoteChange = (event) => {    
  console.log(event.target.value)    
  setNewNote(event.target.value)  } 

const notesToShow = showAll ? notes : notes.filter(note => note.important)

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}
  return (
    <div>
      <Notification message={addedMessage}></Notification>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <button onClick={() => setShowAll(!showAll)}>{showAll ? "important": "all"}</button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}
export default App