import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {v4} from 'uuid'

class JobItem extends Component {
  state = {
    obj1: {},
    obj2: {},
    array1: [],
    array2: [],
    active5: false,
    active6: false,
  }

  componentDidMount() {
    this.getItems()
  }

  fail = () => (
    <div className="ultra">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="head4">Oops! Something Went Wrong</h1>
      <p className="para4">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="but6" onClick={this.getItems} type="button">
        Retry
      </button>
    </div>
  )

  getItems = async () => {
    this.setState({active5: true})
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
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
      const update1 = {
        companyLogo: data.job_details.company_logo_url,
        companyWebsite: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        description: data.job_details.job_description,
        location: data.job_details.location,
        package: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const update2 = data.job_details.skills.map(item => ({
        imageUrl: item.image_url,
        name: item.name,
        id: v4(),
      }))

      const update3 = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const update4 = data.similar_jobs.map(item => ({
        companyLogo: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        description: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({
        obj1: update1,
        obj2: update3,
        array1: update2,
        array2: update4,
        active5: false,
      })
    } else {
      this.setState({active5: false, active6: true})
    }
  }

  render() {
    const {obj1, obj2, array1, array2, active5, active6} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    if (active5) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }
    if (active6) {
      return this.fail()
    }
    return (
      <>
        <div className="tiger">
          <div className="tiger1">
            <img src={obj1.companyLogo} className="image8" alt="job details company logo" />
            <div className="tiger2">
              <h1 className="lion1">{obj1.title}</h1>
              <p className="lion2">{obj1.rating}</p>
            </div>
          </div>
          <div className="fox">
            <div className="fox1">
              <p className="tail2">{obj1.location}</p>
              <p className="tail2">{obj1.employmentType}</p>
            </div>
            <p className="tail2">{obj1.package}</p>
          </div>
          <hr className="hot" />
          <div className="monkey">
            <div className="monkey1">
              <h1 className="lion1"> Description </h1>
              <a href={obj1.companyWebsite} className="slow2" target="_blank">
                Visit
              </a>
            </div>
            <p className="tail2">{obj1.description}</p>
          </div>
          <div className="skills">
            <h1 className="lion1">Skills</h1>
            <ul className="s1">
              {array1.map(item => (
                <li className="s2" key={item.id}>
                  <img src={item.imageUrl} className="image9" alt={item.name} />
                  <p className="para9">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="monkey1">
            <div>
              <h1 className="lion1">Life at Company</h1>
              <p className="lion1">{obj2.description}</p>
            </div>
            <img
              src={obj2.imageUrl}
              className="image10"
              alt="life at company"
            />
          </div>
        </div>
        <div className="reptile">
          <h1 className="tail2">Similar Jobs</h1>
          <ul className="frog">
            {array2.map(item => (
              <li className="frog1" key={item.id}>
                <div className="tiger1">
                  <img
                    src={item.companyLogo}
                    className="image8"
                    alt="similar job company logo"
                  />
                  <div className="tiger2">
                    <h1 className="lion1">{item.title}</h1>
                    <p className="lion2">{item.rating}</p>
                  </div>
                </div>
                <h1 className="lion1">Description</h1>
                <p className="lion1">{item.description}</p>
                <div className="lizard">
                  <p className="lion1">{item.location}</p>
                  <p className="lion1">{item.employmentType}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}
export default JobItem
