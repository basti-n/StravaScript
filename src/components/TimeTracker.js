import React from 'react'
import styled from 'styled-components'

const StyledTimerButton = styled.button`
  justify-self: center;
  align-self: center;
  color: var(--light-font);
  background: var(--primary-color);
  outline: none;
  border-radius: 50%;
  border: none;
  width: 140px;
  height: 140px;

  img {
    padding-top: 20px;
    height: 45px;
    width: 45px;
  }
`

export default function TimeTracker({ isTracking, onTimerClick }) {
  const handleClick = () => {
    onTimerClick()
  }

  return (
    <StyledTimerButton onClick={handleClick}>
      <img
        src={isTracking ? '/assets/stop.svg' : '/assets/play.svg'}
        alt="start-stop-button"
      />
      <p>{isTracking ? 'Stop' : 'Start'}</p>
    </StyledTimerButton>
  )
}
