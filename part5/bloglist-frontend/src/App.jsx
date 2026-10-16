import { useState, useEffect, useRef } from 'react'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import { Container, AppBar, Toolbar, Button } from '@mui/material'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const Menu = ({ user, onLogout }) => {
  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/" sx={style}>
          blogs
        </Button>
        {user && (
          <Button color="inherit" component={Link} to="/create" sx={style}>
            create new
          </Button>
        )}
        {user ? (
          <span>
            <em>{user.name} logged in</em>
            <Button color="inherit" onClick={onLogout}>
              logout
            </Button>
          </span>
        ) : (
          <Button color="inherit" component={Link} to="/login" sx={style}>
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

const BlogList = ({ blogs, user, onLike, onRemove }) => (
  <div>
    <h2>blogs</h2>
    {[...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          onLike={onLike}
          onRemove={onRemove}
        />
      ))}
  </div>
)

const BlogView = ({ blog, user, onLike, onRemove }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <Blog blog={blog} user={user} onLike={onLike} onRemove={onRemove} />
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const notify = (text, type = 'success') => {
    setNotification({ text, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    navigate('/')
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat({ ...returnedBlog, user }))
        notify(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        navigate('/')
      })
      .catch((error) => {
        notify(error.response?.data?.error || 'blog creation failed', 'error')
      })
  }

  const likeBlog = (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id || blogObject.user,
    }
    blogService.update(blogObject.id, updatedBlog).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) =>
          blog.id !== blogObject.id
            ? blog
            : { ...returnedBlog, user: blogObject.user }
        )
      )
    })
  }

  const removeBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      blogService.remove(blogObject.id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
        notify(`blog ${blogObject.title} removed`)
        navigate('/')
      })
    }
  }

  return (
    <Container>
      <Menu user={user} onLogout={handleLogout} />
      <Notification notification={notification} />

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              user={user}
              onLike={likeBlog}
              onRemove={removeBlog}
            />
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/" />
            ) : (
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
            )
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blog={blog}
              user={user}
              onLike={likeBlog}
              onRemove={removeBlog}
            />
          }
        />
        <Route
          path="/create"
          element={
            user ? (
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </Container>
  )
}

export default App
