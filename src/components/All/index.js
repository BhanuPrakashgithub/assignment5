import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'

class All extends Component {
  state = {obj: {}, active1: false, active2: false}

  componentDidMount() {
    this.getData()
  }

  failure1 = () => (
    <div className="sofa">
      <button className="but4" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  getData = async () => {
    this.setState({active1: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
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
      const up = {
        name: data.profile_details.name,
        imageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({obj: up, active1: false})
    } else {
      this.setState({active1: false, active2: true})
    }
  }

  render() {
    const {employment, salary} = this.props
    const {obj, active1, active2} = this.state
    if (active1) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    return (
      <div className="desert">
        <div>
          {active2 ? (
            this.failure1()
          ) : (
            <div className="forest">
              <img src={obj.imageUrl} className="image4" alt="profile" />
              <h1 className="head6">{obj.name}</h1>
              <p className="para6">{obj.shortBio}</p>
            </div>
          )}
        </div>
        <hr className="hot" />
        <div className="cat">
          <h1 className="head7">Type of Employment</h1>
          <ul className="list1">
            {employment.map(each => (
              <li className="list2" key={each.employmentTypeId}>
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  onChange={() => {
                    this.cutting(each)
                  }}
                />
                <label className="label1" htmlFor={each.employmentTypeId}>
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr className="hot" />
        <div className="dog">
          <h1 className="head7">Salary Range</h1>
          <ul className="list1">
            {salary.map(each => (
              <li className="list2" key={each.salaryRangeId}>
                <input
                  type="radio"
                  id={each.salaryRangeId}
                  onChange={() => {
                    this.trigger(each)
                  }}
                  name="options"
                />
                <label htmlFor={each.salaryRangeId} className="label1">
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default All
