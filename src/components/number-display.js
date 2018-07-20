import React from 'react'

export const NumberDisplay = ({
  value,
  showAsPercent,
  precision,
}) => {
  const className = (value >= 0) ? 'text-success' : 'text-danger'
  const number = showAsPercent ? value * 100 : value
  const displayedNumber = precision ? number.toFixed(precision) : number.toFixed(2)

  return (
    <div className={className}>
      {displayedNumber}{ showAsPercent && '%' }
    </div>
  )
}
