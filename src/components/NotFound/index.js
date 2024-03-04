import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="ultra">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
        <h1 className="head4">Page Not Found</h1>
        <p className="para4">
          we're sorry, the page you requested could not be found
        </p>
      </div>
    )
  }
}
export default NotFound
