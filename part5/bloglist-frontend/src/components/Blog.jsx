import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const Blog = ({ blog, user, onLike, onRemove }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showRemove =
    user && blog.user && blog.user.username === user.username

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'hide' : 'view'}
        </button>
      </div>
      {expanded && (
        <div className="blog-details">
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            likes {blog.likes}
            {user && (
              <Button size="small" onClick={() => onLike(blog)}>
                like
              </Button>
            )}
          </div>
          <div>{blog.user && blog.user.name}</div>
          {showRemove && (
            <button onClick={() => onRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
