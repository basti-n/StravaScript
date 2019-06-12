import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import PieChart from './PieChart'
import { getTypeOf } from '../utils'

const StyledTimerButtonContainer = styled.section`
  padding: 10px 0;
`

const StyledTimerButton = styled.button`
  background: ${props => props.theme.primaryColor};
  border: none;
  border-radius: 50%;
  color: ${props => props.theme.lightFont};
  height: 36.8vw;
  left: 50%;
  margin-left: calc(-36.8vw / 2);
  outline: none;
  position: absolute;
  top: 34px;
  width: 36.8vw;
  @media (min-width: 600px) {
    height: 138px;
    width: 138px;
    margin: 0 -69px;
  }
  img {
    height: 40px;
    padding-top: 20px;
    width: 40px;
  }
`

function TimerButton({
  codingActivities,
  handleTimerClick,
  isTracking,
  stravaActivities,
  theme,
}) {
  function getTotalDurationInSecondsByActivityType(
    activities,
    activityType,
    activityCategory
  ) {
    return Math.round(
      activities
        .filter(activity => {
          const activityAttributes = activity[activityCategory]
          return typeof activityAttributes === 'string'
            ? activityAttributes === activityType
            : activityAttributes.includes(activityType)
        })
        .reduce((acc, curr) => acc + curr.duration, 0) / 60
    )
  }

  function getTotalDuration(...activities) {
    if (getTypeOf(activities) !== 'array') {
      return 0
    }
    return activities.flat().reduce((acc, curr) => acc + curr, 0)
  }

  const cssDuration = getTotalDurationInSecondsByActivityType(
    codingActivities,
    'css',
    'languages'
  )
  const jsDuration = getTotalDurationInSecondsByActivityType(
    codingActivities,
    'js',
    'languages'
  )
  const backendDuration = getTotalDurationInSecondsByActivityType(
    codingActivities,
    'backend',
    'languages'
  )

  const stravaBikeDuration = getTotalDurationInSecondsByActivityType(
    stravaActivities,
    'Ride',
    'type'
  )
  const stravaRunDuration = getTotalDurationInSecondsByActivityType(
    stravaActivities,
    'Run',
    'type'
  )

  const stravaWorkoutDuration =
    getTotalDurationInSecondsByActivityType(
      stravaActivities,
      'Workout',
      'type'
    ) +
    getTotalDurationInSecondsByActivityType(
      stravaActivities,
      'WeightTraining',
      'type'
    )

  const totalDurationPerActivityType = [
    getTotalDuration(backendDuration, cssDuration, jsDuration),
    getTotalDuration(
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
    <StyledTimerButtonContainer>
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
      <StyledTimerButton onClick={handleTimerClick}>
        <img
          src={isTracking ? '/assets/stop.svg' : '/assets/play.svg'}
          alt="start-stop-button"
        />
        <p>{isTracking ? 'Stop' : 'Start'}</p>
      </StyledTimerButton>
    </StyledTimerButtonContainer>
  )
}

export default withTheme(TimerButton)

TimerButton.propTypes = {
  codingActivities: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.number,
      languages: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  handleTimerClick: PropTypes.func,
  isTracking: PropTypes.bool,
  stravaActivities: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.number,
      type: PropTypes.string,
    })
  ),
  theme: PropTypes.object,
}
