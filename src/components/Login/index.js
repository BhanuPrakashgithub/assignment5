import {Component} from 'react'
import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', error: '', active: false}

  first = event => this.setState({username: event.target.value})

  second = event => this.setState({password: event.target.value})

  success = param => {
    const {history} = this.props
    Cookies.set('jwt_token', param, {expires: 2})
    history.replace('/')
  }

  failure = param1 => this.setState({error: param1, active: true})

  third = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {username, password, error, active} = this.state
    const jwt_token = Cookies.get('jwt_token')
    console.log(jwt_token)
    console.log(this.props)
    if (jwt_token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main">
        <div className="main-login">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image1"
          />
          <div className="user1">
            <label htmlFor="root1" className="label1">
              USERNAME
            </label>
            <input
              type="text"
              className="input1"
              id="root1"
              placeholder="Username"
              value={username}
              onChange={this.first}
            />
          </div>
          <div className="user1">
            <label htmlFor="root2" className="label1">
              PASSWORD
            </label>
            <input
              type="password"
              className="input1"
              id="root2"
              placeholder="Password"
              value={password}
              onChange={this.second}
            />
          </div>
          <button className="but" onClick={this.third}>
            Login
          </button>
          {active && <p>{error}</p>}
        </div>
      </div>
    )
  }
}
export default Login
