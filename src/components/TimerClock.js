import React from 'react'
import styled from 'styled-components'
import { formatToMinutesAndSeconds } from '../services'

const StyledRunningTimer = styled.h2`
  @import url(http://allfont.de/allfont.css?fonts=ds-digital);
  align-items: center;
  background: var(--primary-color);
  color: var(--light-font);
  font-size: ${props => (props.runningTime ? '20px' : '16px')};
  font-family: ${props => (props.runningTime ? 'DS-Digital' : 'inherit')};
  font-weight: bold;
  display: flex;
  margin: 0;
  justify-content: center;
`

export default function TimerClock({ runningTime }) {
  const displayTime = formatToMinutesAndSeconds(runningTime)
  return (
    <StyledRunningTimer runningTime={runningTime}>
      {runningTime ? `${displayTime}` : `StravaScript`}
    </StyledRunningTimer>
  )
}
