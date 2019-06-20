import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import PieChart from './PieChart'
import stopIcon from '../assets/stop.svg'
import playIcon from '../assets/play.svg'
import { getTypeOf } from '../utils'
import getTheme from '../theme'

const StyledTimerChartContainer = styled.section`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 25px 0 10px;
  position: relative;
`

export const StyledTimerButton = styled.button`
  background: ${props => props.theme.primaryColor};
  border: none;
  border-radius: 50%;
  color: ${props => props.theme.lightFont};
  height: 36.8vw;
  outline: none;
  position: absolute;
  width: 36.8vw;
  @media (min-width: 600px) {
    height: 135px;
    width: 135px;
  }
  img {
    height: 40px;
    padding-top: 20px;
    width: 40px;
  }
`

function TimerChart({
  codingActivitiesDurationAndType,
  handleTimerClick,
  isTracking,
  stravaActivitiesDurationAndType,
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
    codingActivitiesDurationAndType,
    'css',
    'languages'
  )
  const jsDuration = getTotalDurationInSecondsByActivityType(
    codingActivitiesDurationAndType,
    'js',
    'languages'
  )
  const backendDuration = getTotalDurationInSecondsByActivityType(
    codingActivitiesDurationAndType,
    'backend',
    'languages'
  )

  const stravaBikeDuration = getTotalDurationInSecondsByActivityType(
    stravaActivitiesDurationAndType,
    'Ride',
    'type'
  )
  const stravaRunDuration = getTotalDurationInSecondsByActivityType(
    stravaActivitiesDurationAndType,
    'Run',
    'type'
  )

  const stravaWorkoutDuration =
    getTotalDurationInSecondsByActivityType(
      stravaActivitiesDurationAndType,
      'Workout',
      'type'
    ) +
    getTotalDurationInSecondsByActivityType(
      stravaActivitiesDurationAndType,
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
    <StyledTimerChartContainer>
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
        <img src={isTracking ? stopIcon : playIcon} alt="start-stop-button" />
        <p>{isTracking ? 'Stop' : 'Start'}</p>
      </StyledTimerButton>
    </StyledTimerChartContainer>
  )
}

export default withTheme(TimerChart)

TimerChart.propTypes = {
  codingActivitiesDurationAndType: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.number,
      languages: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  handleTimerClick: PropTypes.func,
  isTracking: PropTypes.bool,
  stravaActivitiesDurationAndType: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.number,
      type: PropTypes.string,
    })
  ),
  theme: PropTypes.object,
}

TimerChart.defaultProps = {
  theme: getTheme(),
}
