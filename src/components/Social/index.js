import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

class Social extends Component {
  render() {
    const {each} = this.props
    const {id} = each
    return (
      <Link to={`/jobs/${id}`}>
        <li className="diary">
          <div className="often">
            <img src={each.companyUrl} alt="company logo" className="image5" />
            <div className="horse">
              <h1 className="tail">{each.title}</h1>
              <p className="star">{each.rating}</p>
            </div>
          </div>
          <div className="camel">
            <div className="rows">
              <p className="tail1">{each.location}</p>
              <p className="tail2">{each.employmentType}</p>
            </div>
            <p className="tail4">{each.package}</p>
          </div>
          <hr className="hot" />
          <div className="elephant">
            <h1 className="tail">Description</h1>
            <p className="tail3">{each.jobDescription}</p>
          </div>
        </li>
      </Link>
    )
  }
}
export default Social
