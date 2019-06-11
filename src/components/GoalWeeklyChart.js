import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getDayOfWeek } from '../utils'

const StyledWeeklyChart = styled.section`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0 15px;
`

const StyledDailyBar = styled.div`
  background: ${props => props.theme.secondaryColor1};
  border-radius: 10px;
  display: flex;
  height: 100px;
  justify-content: center;
  position: relative;
  width: 10px;

  p {
    bottom: -15px;
    color: ${props => props.theme.fontColor};
    font-size: 12px;
    font-weight: lighter;
    margin: 0;
    position: absolute;
  }
`

const StyledDailyBarCompleted = styled.div`
  background: ${props => props.theme.fontColorHeadline};
  border-radius: 10px;
  bottom: 0;
  height: ${props => props.height}%;
  position: absolute;
  width: 10px;
`

export default function GoalWeeklyChart({
  activitiesLastWeekByWeekday,
  dailyGoal,
}) {
  function getAbbreviatedDayOfWeek(daysBackFromToday) {
    return getDayOfWeek(daysBackFromToday).substr(0, 2)
  }
  function getPercentageOfGoalAchieved(daysBackFromToday) {
    const day = getDayOfWeek(daysBackFromToday)

    return activitiesLastWeekByWeekday[day] > dailyGoal * 1.4
      ? 140
      : (activitiesLastWeekByWeekday[day] / dailyGoal) * 100
  }

  return (
    <StyledWeeklyChart>
      {Object.entries(activitiesLastWeekByWeekday)
        .map((activityOnWeekday, index) => index)
        .sort((a, b) => b - a)
        .map(daysBackFromToday => (
          <StyledDailyBar key={daysBackFromToday}>
            <StyledDailyBarCompleted
              height={getPercentageOfGoalAchieved(daysBackFromToday)}
            />
            <p>{getAbbreviatedDayOfWeek(daysBackFromToday)}</p>
          </StyledDailyBar>
        ))}
    </StyledWeeklyChart>
  )
}

GoalWeeklyChart.propTypes = {
  activitiesLastWeekByWeekday: PropTypes.objectOf(PropTypes.number),
  dailyGoal: PropTypes.number,
}
