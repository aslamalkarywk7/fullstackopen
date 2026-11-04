import { ALL_BOOKS } from '../queries'

const mergeBook = ({ allBooks }) => (bookToAdd) => {
  const bookExists = allBooks.some((book) => book.id === bookToAdd.id)

  if (bookExists) {
    return { allBooks }
  }

  return {
    allBooks: allBooks.concat(bookToAdd),
  }
}

export const addBookToCache = (cache, bookToAdd) => {
  // the books view keeps two watched variants of the same query
  // (no variables for the genre buttons, { genre: null } for the list),
  // so both entries have to be updated
  const variants = [{ query: ALL_BOOKS }, { query: ALL_BOOKS, variables: { genre: null } }]

  variants.forEach((entry) => {
    try {
      cache.updateQuery(entry, (data) => {
        if (!data) {
          return data
        }
        return mergeBook(data)(bookToAdd)
      })
    } catch {
      // entry not in cache yet, nothing to update
    }
  })
}
