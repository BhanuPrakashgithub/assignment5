import {Component} from 'react'
import Header from '../Header'
import All from '../All'
import {Redirect} from 'react-router-dom'
import './index.css'
import Social from '../Social'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {array: [], active4: false, active5: false}

  componentDidMount() {
    this.getDetails()
  }

  fail2 = () => (
    <div className="king">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="tail1">No Jobs Found</h1>
      <p className="tail1">We could not find any jobs. Try other filters</p>
    </div>
  )

  failure2 = () => (
    <div className="ultra">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="head4">Oops! Something Went Wrong</h1>
      <p className="para4">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="but6" onClick={this.getDetails} type="button">
        Retry
      </button>
    </div>
  )

  getDetails = async () => {
    this.setState({active5: true})
    const url = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const update = data.jobs.map(each => ({
        id: each.id,
        companyUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        package: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({array: update, active5: false})
    } else {
      this.setState({active4: true, active5: false})
    }
  }

  render() {
    const {array, active4, active5} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    if (active5) {
      return (
        <div className="loader-container" testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }
    if (active4) {
      return this.failure2()
    }

    if (array.length === 0) {
      return this.fail2()
    }

    return (
      <div className="pet">
        <Header />
        <div className="pet1">
          <All employment={employmentTypesList} salary={salaryRangesList} />
          <div className="tea">
            <div className="tea1">
              <input type="search" placeholder="Search" className="input2" />
              <button
                type="button"
                data-testid="searchButton"
                className="input3"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="course">
              {array.map(each => (
                <Social key={each.id} each={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
