import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const StyledWeeklyChart = styled.section`
  display: flex;
  padding: 0 15px;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`

const StyledDailyChart = styled.div`
  width: 10px;
  height: 100px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background: ${props => props.theme.secondaryColor1};
  position: relative;

  > div {
    border-radius: 10px;
    background: ${props => props.theme.primaryColor};
    height: ${props => props.height}%;
    width: 10px;
    position: absolute;
    bottom: 0;
  }

  p {
    position: absolute;
    bottom: -15px;
    font-size: 12px;
    font-weight: lighter;
    margin: 0;
  }
`

export default function GoalWeeklyChart({ activitiesPerDay, weeklyGoal }) {
  const dailyGoalInHrs = weeklyGoal / 7

  function getDayOfWeek(daysBackFromToday) {
    return moment()
      .subtract(daysBackFromToday, 'day')
      .format('dddd')
  }

  function getPercentageOfGoalAchieved(daysBackFromToday) {
    const day = getDayOfWeek(daysBackFromToday)

    return activitiesPerDay[day] > dailyGoalInHrs * 1.4
      ? 140
      : (activitiesPerDay[day] / dailyGoalInHrs) * 100
  }

  return (
    <StyledWeeklyChart>
      <StyledDailyChart height={getPercentageOfGoalAchieved(6)}>
        <div />
        <p>{getDayOfWeek(6).substr(0, 2)}</p>
      </StyledDailyChart>
      <StyledDailyChart height={getPercentageOfGoalAchieved(5)}>
        <div />
        <p>{getDayOfWeek(5).substr(0, 2)}</p>
      </StyledDailyChart>
      <StyledDailyChart height={getPercentageOfGoalAchieved(4)}>
        <div />
        <p>{getDayOfWeek(4).substr(0, 2)}</p>
      </StyledDailyChart>
      <StyledDailyChart height={getPercentageOfGoalAchieved(3)}>
        <div />
        <p>{getDayOfWeek(3).substr(0, 2)}</p>
      </StyledDailyChart>
      <StyledDailyChart height={getPercentageOfGoalAchieved(2)}>
        <div />
        <p>{getDayOfWeek(2).substr(0, 2)}</p>
      </StyledDailyChart>
      <StyledDailyChart height={getPercentageOfGoalAchieved(1)}>
        <div />
        <p>{getDayOfWeek(1).substr(0, 2)}</p>
      </StyledDailyChart>
      <StyledDailyChart height={getPercentageOfGoalAchieved(0)}>
        <div />
        <p>{getDayOfWeek(0).substr(0, 2)}</p>
      </StyledDailyChart>
    </StyledWeeklyChart>
  )
}
