const AnecdoteForm = ({ onCreate }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    onCreate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onSubmit}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
