import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class ProtectRoute extends Component {
  render() {
    const jwt_token = Cookies.get('jwt_token')
    if (jwt_token === undefined) {
      return <Redirect to="/login" />
    }
    return <Route {...this.props} />
  }
}
export default ProtectRoute
