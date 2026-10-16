import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <div>
    <h2>log in to application</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          login
        </Button>
      </div>
    </form>
  </div>
)

export default LoginForm
