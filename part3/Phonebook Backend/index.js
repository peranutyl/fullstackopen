const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(express.json())
app.use(morgan("tiny"))

console.log("cat")
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.send(persons)
})

app.post("/api/persons", (req, res) => {
    const id = (Math.random() * 1000000).toString()
    const person = {...req.body, "id": id}
    if (persons.find(p => p.name === person.name)) {
        return res.status(400).end(JSON.stringify({error: "name must be unique"}))
    } else if (!person.name || ! person.number) {
        return res.status(400).end(JSON.stringify({error: "fields missing"}))
    }
    console.log(person)
    res.json(person)
})

app.get("/info", (req, res) => {
    let len = persons.length
    let currentDate = new Date().toString()
    res.send(`<p>Phonebook has info for ${len} people</p><p>${currentDate}</p>`)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        return res.send(person)
    } else {
        return res.status(404).end()
    }
        
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id != id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})