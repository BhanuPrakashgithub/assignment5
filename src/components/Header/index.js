import {Component} from 'react'
import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class Header extends Component {
  fashion = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="mega">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image2"
          />
        </Link>

        <ul className="power">
          <li className="cars">
            <Link to="/" className="power1">
              Home
            </Link>
          </li>
          <li className="cars">
            <Link to="/jobs" className="power1">
              Jobs
            </Link>
          </li>
          <li className="cars">
            <button className="but2" onClick={this.fashion}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }
}
export default withRouter(Header)
