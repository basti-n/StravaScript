import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import uid from 'uid'

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

export default function TimeTracker({
  setCodingActivities,
  setRunningTime,
  runningTime,
}) {
  const [isActive, setIsActive] = useState(runningTime ? true : false)

  function handleTrackingStop() {
    if (!runningTime) {
      return
    }
    const completedCodingActivity = {
      name: 'Coding Activity',
      type: 'Code',
      id: uid(),
      elapsed_time: runningTime,
      start_date: new Date().toISOString(),
      languages: ['backend', 'css', 'js'],
    }

    setCodingActivities(prevCodingActivities => [
      ...prevCodingActivities,
      completedCodingActivity,
    ])
    setRunningTime(0)
  }

  useEffect(() => {
    let interval
    if (isActive) {
      const startTime = Date.now()
      interval = setInterval(
        () =>
          setRunningTime(
            Math.floor((Date.now() - startTime + runningTime * 1000) / 1000)
          ),
        1000
      )
    } else if (!isActive) {
      handleTrackingStop()
      clearInterval(interval)
    }
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  const handleClick = () => {
    setIsActive(!isActive)
  }

  return (
    <StyledTimerButton onClick={handleClick}>
      <img
        src={isActive ? '/assets/stop.svg' : '/assets/play.svg'}
        alt="start-stop-button"
      />
      <p>{isActive ? 'Stop' : 'Start'}</p>
    </StyledTimerButton>
  )
}
