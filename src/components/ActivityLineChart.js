import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLineChart = styled.div`
  align-items: center;
  color: ${props => props.color};
  display: grid;
  grid-template-rows: auto 6px auto;
  grid-row-gap: 5px;
  min-width: fit-content;
  width: ${props => props.width}%;

  h5,
  h6 {
    margin: 0;
    text-align: center;
    white-space: nowrap;
  }

  h5 {
    color: ${props =>
      props.theme.name === 'dark' ? props.color : props.theme.fontColor};
    font-weight: normal;
    font-size: 15px;
  }
  img {
    justify-self: center;
  }
`

const StyledHorizontalActivityLine = styled.div`
  background: ${props => props.color};
  border-radius: 15px;
  color: ${props => props.color};
  height: 100%;
`

export default function ActivityLineChart({
  color,
  duration,
  icon,
  title,
  width,
}) {
  return (
    width > 0 && (
      <StyledLineChart color={color} width={width}>
        <h6>{duration}</h6>
        <StyledHorizontalActivityLine color={color} />
        {icon ? <img src={icon} alt={`${title} icon`} /> : <h5>{title}</h5>}
      </StyledLineChart>
    )
  )
}

ActivityLineChart.propTypes = {
  color: PropTypes.string,
  duration: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number.isRequired,
}

ActivityLineChart.defaultProps = {
  color: '#D2D2D2',
}
