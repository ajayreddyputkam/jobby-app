import './index.css'

const SalaryRange = props => {
  const {eachItem, selectedRadioButtonValue} = props
  const {salaryRangeId, label} = eachItem

  const selectRadioButton = () => {
    selectedRadioButtonValue(salaryRangeId)
  }

  return (
    <li className="salary-list-item">
      <input
        type="radio"
        value={salaryRangeId}
        name="salary"
        id={salaryRangeId}
        className="salary-input-item"
        onChange={selectRadioButton}
      />
      <label htmlFor={salaryRangeId} className="salary-label-item">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
