import React from 'react'
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

export default function TimerClock({ trackingTime }) {
  const displayTime = formatToMinutesAndSeconds(trackingTime)
  return (
    <StyledRunningTimer runningTime={trackingTime}>
      {trackingTime ? `${displayTime}` : `StravaScript`}
    </StyledRunningTimer>
  )
}
