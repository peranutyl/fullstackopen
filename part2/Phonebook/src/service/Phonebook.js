import axios from "axios"

const getAll = () => {
    return axios
    .get('http://localhost:3001/persons')
    .then(response => response.data)
}

const addPerson = newObject => {
    return axios
    .post('http://localhost:3001/persons', newObject)
    .then(response => response.data)
}

const updatePerson = (id, newObject) => {
    return axios
    .put(`http://localhost:3001/persons/${id}`, newObject)
    .then(response => response.data)
}

const deletePerson = id => {
    return axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then(response => response.data)
}



export default {getAll, addPerson, updatePerson, deletePerson}