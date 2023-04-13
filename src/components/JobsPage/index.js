import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobsListPage from '../JobsListPage'

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

const responseStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsPage extends Component {
  state = {
    profileDetails: {},
    isProfileValid: responseStatusList.initial,
    employmentTypeList: [],
    jobsDataObject: {},
    isJobsDataReceived: responseStatusList.initial,
    minimumSalary: 1000000,
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getProfileDetails = async () => {
    this.setState({isProfileValid: responseStatusList.inProgress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const profileResponse = await fetch(profileUrl, options)
    const profileData = await profileResponse.json()
    if (profileResponse.ok) {
      const formattedData = {
        name: profileData.profile_details.name,
        profileImageUrl: profileData.profile_details.profile_image_url,
        shortBio: profileData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formattedData,
        isProfileValid: responseStatusList.success,
      })
    } else {
      this.setState({isProfileValid: responseStatusList.failure})
    }
  }

  formatJobsData = jobsList => {
    const formattedList = jobsList.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    return formattedList
  }

  getJobsList = async () => {
    this.setState({isJobsDataReceived: responseStatusList.inProgress})
    const {employmentTypeList, minimumSalary, searchInput} = this.state
    const joinTypeList = employmentTypeList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${joinTypeList}&minimum_package=${minimumSalary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jobsDataResponse = await fetch(jobsUrl, options)
    const jobsData = await jobsDataResponse.json()
    if (jobsDataResponse.ok) {
      const formattedJobsObject = {
        jobs: this.formatJobsData(jobsData.jobs),
        total: jobsData.total,
      }
      this.setState({
        jobsDataObject: formattedJobsObject,
        isJobsDataReceived: responseStatusList.success,
      })
    } else {
      this.setState({isJobsDataReceived: responseStatusList.failure})
    }
  }

  selectedCheckboxId = empType => {
    const {employmentTypeList} = this.state
    this.setState(
      {employmentTypeList: [...employmentTypeList, empType]},
      this.getJobsList,
    )
  }

  unSelectedCheckboxId = employmentType => {
    const {employmentTypeList} = this.state
    const updatedTypeList = employmentTypeList.filter(
      eachType => eachType !== employmentType,
    )
    this.setState({employmentTypeList: updatedTypeList}, this.getJobsList)
  }

  selectedRadioButtonValue = salaryValue => {
    this.setState({minimumSalary: salaryValue}, this.getJobsList)
  }

  changeTheSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchedData = () => {
    this.getJobsList()
  }

  renderJobsList = () => {
    const {jobsDataObject} = this.state
    const {jobs} = jobsDataObject

    if (jobs.length === 0) {
      return (
        <div className="jobs-page-jobs-not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="jobs-page-jobs-not-found-image"
          />
          <h1 className="jobs-page-jobs-not-found-heading">No Jobs Found</h1>
          <p className="jobs-page-jobs-not-found-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <ul className="jobs-list-container">
        {jobs.map(eachJob => (
          <JobsListPage eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderJobsListInProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryTheJobsList = () => {
    this.getJobsList()
  }

  renderJobsListFailureView = () => (
    <div className="jobs-page-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-page-failure-image"
      />
      <h1 className="jobs-page-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-page-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-page-failure-retry-button"
        onClick={this.retryTheJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderTheJobsData = () => {
    const {isJobsDataReceived} = this.state

    switch (isJobsDataReceived) {
      case responseStatusList.success:
        return this.renderJobsList()
      case responseStatusList.inProgress:
        return this.renderJobsListInProgress()
      case responseStatusList.failure:
        return this.renderJobsListFailureView()

      default:
        return null
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-jobs-page-container">
        <img
          src={profileImageUrl}
          alt="profile"
          className="profile-image-jobs-page"
        />
        <h1 className="profile-name-jobs-page">{name}</h1>
        <p className="profile-bio-jobs-page">{shortBio}</p>
      </div>
    )
  }

  renderProfileLoadingView = () => (
    <div className="loader-profile-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryProfileApi = () => {
    this.getProfileDetails()
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="profile-failure-retry-button"
        onClick={this.retryProfileApi}
      >
        Retry
      </button>
    </div>
  )

  renderAllProfilePage = () => {
    const {isProfileValid} = this.state

    switch (isProfileValid) {
      case responseStatusList.success:
        return this.renderProfileView()
      case responseStatusList.inProgress:
        return this.renderProfileLoadingView()
      case responseStatusList.failure:
        return this.renderProfileFailureView()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-page-bg-container">
        <Header />
        <div className="jobs-page-main-container">
          <div className="search-bar-container-sm">
            <input
              type="search"
              placeholder="Search"
              className="search-input-element"
              onChange={this.changeTheSearchInput}
              value={searchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-icon-container"
              onClick={this.getSearchedData}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="filters-profile-jobs-page-container">
            {this.renderAllProfilePage()}
            <hr className="filters-hr-line" />
            <ul className="employment-type-list-container">
              <h1 className="type-of-employment-heading">Type of Employment</h1>
              {employmentTypesList.map(eachType => (
                <EmploymentType
                  eachType={eachType}
                  key={eachType.employmentTypeId}
                  selectedCheckboxId={this.selectedCheckboxId}
                  unSelectedCheckboxId={this.unSelectedCheckboxId}
                />
              ))}
            </ul>
            <hr className="filters-hr-line-2" />
            <ul className="employment-type-list-container">
              <h1 className="salary-range-heading">Salary Range</h1>
              {salaryRangesList.map(eachItem => (
                <SalaryRange
                  eachItem={eachItem}
                  key={eachItem.salaryRangeId}
                  selectedRadioButtonValue={this.selectedRadioButtonValue}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-list-main-container">
            <div className="search-bar-container-lg">
              <input
                type="search"
                placeholder="Search"
                className="search-input-element"
                onChange={this.changeTheSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon-container"
                onClick={this.getSearchedData}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderTheJobsData()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
