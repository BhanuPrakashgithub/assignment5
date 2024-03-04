import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  cost = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    const jwt_token = Cookies.get('jwt_token')
    console.log(jwt_token)
    if (jwt_token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="hard">
          <h1 className="head">Find The Job That Fits Your Life</h1>
          <p className="para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="but1" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}
export default Home
