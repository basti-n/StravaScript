import React from 'react'
import styled from 'styled-components'
import PieChart from './PieChart'

const StyledTimeTracker = styled.section`
  padding: 10px 0;
`

const StyledTimerButton = styled.button`
  justify-self: center;
  align-self: center;
  color: var(--light-font);
  background: var(--primary-color);
  outline: none;
  border-radius: 50%;
  border: none;
  width: 36.8vw;
  height: 36.8vw;
  position: absolute;
  margin-left: -18.4vw;
  left: 50%;
  top: 85px;
  img {
    padding-top: 20px;
    height: 40px;
    width: 40px;
  }
`

export default function TimeTracker({
  isTracking,
  onTimerClick,
  codingActivities,
  stravaActivities,
}) {
  const handleClick = () => {
    onTimerClick()
  }

  function totalDurationByCriteria(activities, criteria, field) {
    return Math.round(
      activities
        .filter(activity => activity[field].includes(criteria))
        .reduce((acc, curr) => acc + curr.duration, 0) / 60
    )
  }

  const cssDuration = totalDurationByCriteria(
    codingActivities,
    'css',
    'languages'
  )
  const jsDuration = totalDurationByCriteria(
    codingActivities,
    'js',
    'languages'
  )
  const backendDuration = totalDurationByCriteria(
    codingActivities,
    'backend',
    'languages'
  )

  // Required for filter

  const stravaBikeDuration = totalDurationByCriteria(
    stravaActivities,
    'Ride',
    'type'
  )
  const stravaRunDuration = totalDurationByCriteria(
    stravaActivities,
    'Run',
    'type'
  )

  const stravaWorkoutDuration =
    totalDurationByCriteria(stravaActivities, 'Workout', 'type') +
    totalDurationByCriteria(stravaActivities, 'WeightTraining', 'type')

  return (
    <StyledTimeTracker>
      <PieChart
        codingData={[backendDuration, cssDuration, jsDuration]}
        stravaData={[
          stravaBikeDuration,
          stravaRunDuration,
          stravaWorkoutDuration,
        ]}
        labels={{
          codingData: ['Backend', 'CSS', 'JS'],
          stravaData: ['Bike', 'Run', 'Workout'],
        }}
      />
      <StyledTimerButton onClick={handleClick}>
        <img
          src={isTracking ? '/assets/stop.svg' : '/assets/play.svg'}
          alt="start-stop-button"
        />
        <p>{isTracking ? 'Stop' : 'Start'}</p>
      </StyledTimerButton>
    </StyledTimeTracker>
  )
}
