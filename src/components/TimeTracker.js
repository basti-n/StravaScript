import React from 'react'
import styled, { withTheme } from 'styled-components'
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

function TimeTracker({
  isTracking,
  onTimerClick,
  codingActivities,
  stravaActivities,
  theme,
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

  const backgroundColor = {
    stravaData: ['#F8F8F8', '#E8E8E8', '#D8D8D8'],
    codingData: ['#D8D8D8', theme.secondaryColor3, theme.secondaryColor2],
    totalData: [theme.fontColorHeadline, '#E8E8E8'],
  }

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
        backgroundColor={backgroundColor}
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

export default withTheme(TimeTracker)
