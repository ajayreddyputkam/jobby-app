import {Component} from 'react'

import './index.css'

class EmploymentType extends Component {
  state = {isChecked: false}

  checkboxValue = () => {
    const {eachType, selectedCheckboxId, unSelectedCheckboxId} = this.props
    const {employmentTypeId} = eachType
    const {isChecked} = this.state

    if (isChecked) {
      selectedCheckboxId(employmentTypeId)
    } else {
      unSelectedCheckboxId(employmentTypeId)
    }
  }

  onSelectCheckbox = () => {
    this.setState(
      prevState => ({isChecked: !prevState.isChecked}),
      this.checkboxValue,
    )
  }

  render() {
    const {eachType} = this.props
    const {isChecked} = this.state
    const {label, employmentTypeId} = eachType

    return (
      <li className="checkbox-list-item">
        <input
          type="checkbox"
          id={employmentTypeId}
          className="checkbox-input"
          onChange={this.onSelectCheckbox}
          checked={isChecked}
        />
        <label htmlFor={employmentTypeId} className="checkbox-label">
          {label}
        </label>
      </li>
    )
  }
}

export default EmploymentType
