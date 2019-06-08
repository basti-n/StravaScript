import React from 'react'
import styled from 'styled-components'
import PieChart from './PieChart'

const StyledTimeTracker = styled.section`
  padding: 10px 0;
`

const StyledTimerButton = styled.button`
  justify-self: center;
  align-self: center;
  color: white;
  background: ${props => props.theme.primaryColor};
  outline: none;
  border-radius: 50%;
  border: none;
  width: 36.8vw;
  height: 36.8vw;
  position: absolute;
  margin-left: -18.4vw;
  left: 50%;
  top: 34px;
  img {
    padding-top: 20px;
    height: 40px;
    width: 40px;
  }
  @media (min-width: 600px) {
    height: 138px;
    width: 138px;
    margin: 0 -69px;
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

  function getTotalDurationByCriteria(activities, criteria, field) {
    return Math.round(
      activities
        .filter(activity => {
          return typeof activity[field] === 'string'
            ? activity[field] === criteria
            : activity[field].includes(criteria)
        })
        .reduce((acc, curr) => acc + curr.duration, 0) / 60
    )
  }

  function getTotalDurationByActivityType(...activities) {
    return activities.flat().reduce((acc, curr) => acc + curr, 0)
  }

  const cssDuration = getTotalDurationByCriteria(
    codingActivities,
    'css',
    'languages'
  )
  const jsDuration = getTotalDurationByCriteria(
    codingActivities,
    'js',
    'languages'
  )
  const backendDuration = getTotalDurationByCriteria(
    codingActivities,
    'backend',
    'languages'
  )

  const stravaBikeDuration = getTotalDurationByCriteria(
    stravaActivities,
    'Ride',
    'type'
  )
  const stravaRunDuration = getTotalDurationByCriteria(
    stravaActivities,
    'Run',
    'type'
  )

  const stravaWorkoutDuration =
    getTotalDurationByCriteria(stravaActivities, 'Workout', 'type') +
    getTotalDurationByCriteria(stravaActivities, 'WeightTraining', 'type')

  const totalDurationPerActivityType = [
    getTotalDurationByActivityType(backendDuration, cssDuration, jsDuration),
    getTotalDurationByActivityType(
      stravaBikeDuration,
      stravaRunDuration,
      stravaWorkoutDuration
    ),
  ]

  return (
    <StyledTimeTracker>
      <PieChart
        codingData={[backendDuration, cssDuration, jsDuration]}
        stravaData={[
          stravaBikeDuration,
          stravaRunDuration,
          stravaWorkoutDuration,
        ]}
        totalData={totalDurationPerActivityType}
        labels={{
          codingData: ['Backend', 'CSS', 'JS'],
          stravaData: ['Bike', 'Run', 'Workout'],
          totalData: ['Coding', 'Sports'],
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
