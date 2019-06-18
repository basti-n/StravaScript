import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { formatToMinutesAndSeconds, formatToHoursAndMinutes } from '../utils'

const StyledTimer = styled.h2`
  @font-face {
    font-family: 'DS-Digital';
    src: url('/assets/DS-Digital.woff2') format('woff2'),
      url('/assets/DS-Digital.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.lightFont};
  display: flex;
  font-family: ${props => (props.isTimerActive ? 'DS-Digital' : 'inherit')};
  font-size: ${props => (props.isTimerActive ? '20px' : '16px')};
  font-weight: bold;
  justify-content: center;
  margin: 0;
`

export default function Timer({ startTime }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (startTime) {
      let interval = setInterval(() => {
        setTime(time + 1)
      }, 500)
      return () => clearInterval(interval)
    }
  }, [startTime, time])

  const activeTimeInSeconds = (Date.now() - startTime) / 1000
  const activeTimeToDisplay =
    activeTimeInSeconds < 60 * 60
      ? formatToMinutesAndSeconds(activeTimeInSeconds)
      : formatToHoursAndMinutes(activeTimeInSeconds)

  return (
    <StyledTimer isTimerActive={startTime > 1}>
      {startTime > 1 ? `${activeTimeToDisplay}` : `StravaScript`}
    </StyledTimer>
  )
}

Timer.propTypes = {
  startTime: PropTypes.number,
}
