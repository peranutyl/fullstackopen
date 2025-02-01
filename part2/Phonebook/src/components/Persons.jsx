const Persons = ({persons, newFilter, deletePerson}) => {
    return (
        <ul>
        {persons.filter(person => person.name.toUpperCase().search(newFilter.toUpperCase()) != -1).map(person => <li key={person.id}>{person.name} {person.number}<button onClick={() => deletePerson(person.id)}>delete</button></li>)}
      </ul>
    )
}

export default Persons