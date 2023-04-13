import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsListPage = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <Link to={`/jobs/${id}`} className="link-container-jobs-list-page">
      <li className="list-item-jobs-list-page">
        <div className="company-logo-container-jobs-list-page">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-jobs-list-container"
          />
          <div className="company-title-container-jobs-list-page">
            <h1 className="company-title-jobs-list-page">{title}</h1>
            <div className="company-rating-container-jobs-list-page">
              <AiFillStar className="rating-icon-jobs-list-page" />
              <p className="rating-jobs-list-page">{rating}</p>
            </div>
          </div>
        </div>
        <div className="salary-job-type-location-container-jobs-list-page">
          <div className="location-job-type-container-jobs-list-page">
            <div className="location-container-jobs-list-page">
              <MdLocationOn className="location-icon-jobs-list-page" />
              <p className="location-jobs-list-page">{location}</p>
            </div>
            <div className="job-type-container-jobs-list-page">
              <BsFillBriefcaseFill className="brief-icon-jobs-list-page" />
              <p className="job-type-jobs-list-page">{employmentType}</p>
            </div>
          </div>
          <p className="package-jobs-list-page">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line-jobs-list-page" />
        <h1 className="description-heading-jobs-list-page">Description</h1>
        <p className="description-jobs-list-page">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsListPage
