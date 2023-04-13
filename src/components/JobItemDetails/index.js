import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'

import './index.css'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const jobDetailsResponseList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    isJobItemReceived: jobDetailsResponseList.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  skillsDetails = skills => {
    const formattedSkills = skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))
    return formattedSkills
  }

  formatDetails = jobDetails => {
    const formattedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: this.skillsDetails(jobDetails.skills),
      title: jobDetails.title,
    }
    return formattedJobDetails
  }

  formatSimilarSkills = similarSkills => {
    const formattedSimilarSkills = similarSkills.map(eachSkill => ({
      companyLogoUrl: eachSkill.company_logo_url,
      employmentType: eachSkill.employment_type,
      id: eachSkill.id,
      jobDescription: eachSkill.job_description,
      location: eachSkill.location,
      rating: eachSkill.rating,
      title: eachSkill.title,
    }))
    return formattedSimilarSkills
  }

  getJobItemDetails = async () => {
    this.setState({isJobItemReceived: jobDetailsResponseList.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobItemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jobItemResponse = await fetch(jobItemUrl, options)
    const jobData = await jobItemResponse.json()
    if (jobItemResponse.ok) {
      const formattedData = {
        jobDetails: this.formatDetails(jobData.job_details),
        similarJobs: this.formatSimilarSkills(jobData.similar_jobs),
      }
      this.setState({
        jobItemDetails: formattedData,
        isJobItemReceived: jobDetailsResponseList.success,
      })
    } else {
      this.setState({isJobItemReceived: jobDetailsResponseList.failure})
    }
  }

  renderJobItemPage = () => {
    const {jobItemDetails} = this.state
    const {jobDetails, similarJobs} = jobItemDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails

    return (
      <div className="job-item-details-main-container">
        <div className="job-item-details-card">
          <div className="company-logo-container-job-item-details">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-job-item-container"
            />
            <div className="company-title-container-job-item-details">
              <h1 className="company-title-job-item-details">{title}</h1>
              <div className="company-rating-job-item-details-container">
                <AiFillStar className="rating-icon-job-item-details" />
                <p className="rating-job-item-details">{rating}</p>
              </div>
            </div>
          </div>
          <div className="salary-job-type-location-container-job-item-details">
            <div className="location-job-type-container-job-item-details">
              <div className="location-container-job-item-details">
                <MdLocationOn className="location-icon-job-item-details" />
                <p className="location-job-item-details">{location}</p>
              </div>
              <div className="job-type-container-job-item-details">
                <BsFillBriefcaseFill className="brief-icon-job-item-details" />
                <p className="job-type-job-item-details">{employmentType}</p>
              </div>
            </div>
            <p className="package-job-item-details">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line-job-item-details" />
          <div className="description-website-link-container-job-item-details">
            <h1 className="description-heading-job-item-details">
              Description
            </h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              className="company-website-url-job-item-list"
              rel="noreferrer"
            >
              <p className="link-text-job-item-details">Visit</p>
              <HiOutlineExternalLink className="website-link-job-item-details" />
            </a>
          </div>
          <p className="description-job-item-details">{jobDescription}</p>
          <h1 className="job-details-skills-heading">Skills</h1>
          <ul className="skills-list-container-job-item-details">
            {skills.map(eachObject => (
              <li
                key={eachObject.name}
                className="skill-list-item-job-item-details"
              >
                <img
                  src={eachObject.imageUrl}
                  alt={eachObject.name}
                  className="skill-image-job-item-details"
                />
                <p className="skill-name-job-details-item">{eachObject.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-job-item-details-heading">Life at Company</h1>
          <div className="life-at-company-des-container">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <div className="similar-jobs-main-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          {similarJobs.map(eachObject => (
            <SimilarJobs eachObject={eachObject} key={eachObject.id} />
          ))}
        </div>
      </div>
    )
  }

  jobDetailsInProgress = () => (
    <div className="loader-container-job-details" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryTheJobDetailsList = () => {
    this.getJobItemDetails()
  }

  renderJobDetailsFailurePage = () => (
    <div className="job-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-image"
      />
      <h1 className="job-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-details-failure-retry-button"
        onClick={this.retryTheJobDetailsList}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsPage = () => {
    const {isJobItemReceived} = this.state

    switch (isJobItemReceived) {
      case jobDetailsResponseList.success:
        return this.renderJobItemPage()
      case jobDetailsResponseList.inProgress:
        return this.jobDetailsInProgress()
      case jobDetailsResponseList.failure:
        return this.renderJobDetailsFailurePage()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-bg-container">
        <Header />
        {this.renderJobDetailsPage()}
      </div>
    )
  }
}

export default JobItemDetails
