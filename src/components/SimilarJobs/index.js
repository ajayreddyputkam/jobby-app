import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {eachObject} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachObject

  return (
    <div className="similar-jobs-card">
      <div className="company-logo-container-similar-job-details">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-similar-job-container"
        />
        <div className="company-title-container-similar-job-details">
          <h1 className="company-title-similar-job-details">{title}</h1>
          <div className="company-rating-similar-details-container">
            <AiFillStar className="rating-icon-similar-job-details" />
            <p className="rating-similar-job-details">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading-similar-jobs">Description</h1>
      <p className="description-similar-jobs">{jobDescription}</p>
      <div className="location-job-type-container-similar-jobs">
        <div className="location-container-similar-jobs">
          <MdLocationOn className="location-icon-similar-jobs" />
          <p className="location-similar-jobs">{location}</p>
        </div>
        <div className="job-type-container-similar-jobs">
          <BsFillBriefcaseFill className="brief-icon-similar-jobs" />
          <p className="job-type-similar-jobs">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
