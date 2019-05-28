import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { formatToMinutesAndSeconds } from '../services'

const StyledRunningTimer = styled.h2`
  @import url(http://allfont.de/allfont.css?fonts=ds-digital);
  background: var(--primary-color);
  color: var(--light-font);
  font-size: ${props => (props.runningTime ? '20px' : '16px')};
  font-family: ${props => (props.runningTime ? 'DS-Digital' : 'inherit')};
  font-weight: bold;
  display: flex;
  margin: 0;
  justify-content: center;
`

export default function TimerClock({ startTime }) {
  const [time, setTime] = useState(0)
  useEffect(() => {
    if (startTime) {
      let interval = setInterval(() => {
        setTime(time + 1)
      }, 500)
      return () => clearInterval(interval)
    }
  }, [startTime, time])

  return (
    <StyledRunningTimer runningTime={startTime > 1}>
      {startTime > 1
        ? `${formatToMinutesAndSeconds((Date.now() - startTime) / 1000)}`
        : `StravaScript`}
    </StyledRunningTimer>
  )
}
