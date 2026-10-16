const Person = ({ person, onRemove }) => (
  <div>
    {person.name} {person.number}{' '}
    <button onClick={() => onRemove(person.id)}>delete</button>
  </div>
)

const Persons = ({ persons, onRemove }) => (
  <div>
    {persons.map((person) => (
      <Person key={person.id} person={person} onRemove={onRemove} />
    ))}
  </div>
)

export default Persons
