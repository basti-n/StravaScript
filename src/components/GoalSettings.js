import React from 'react'
import styled from 'styled-components'
import { StyledMainHeadline } from './StyledComponents'
import Slider from './Slider'
import GoalWeeklyChart from './GoalWeeklyChart'
import moment from 'moment'
import 'moment/locale/de'
import { formatMinutesToHours } from '../services'
moment.locale('de')

const StyledGoalHeadline = styled(StyledMainHeadline)`
  display: flex;
  align-items: flex-end;
  padding: 0 10px;

  span {
    color: #b3b3b3;
    font-size: 0.8rem;
    font-weight: normal;
    display: inline-block;
    margin-left: auto;
    padding-bottom: 3px;
  }
`

const Grid = styled.main`
  display: grid;
  grid-template-rows: 40px 200px 100px 70px;
`

export default function GoalSettings({
  page,
  weeklyGoal,
  setWeeklyGoal,
  activitiesPerDay,
}) {
  const activititesThisWeek = Object.values(activitiesPerDay).reduce(
    (arr, curr) => arr + curr,
    0
  )

  const goalMinutes = weeklyGoal[page] * 60
  const timeToGoal = goalMinutes - activititesThisWeek

  return (
    <Grid>
      <StyledGoalHeadline>
        {page}{' '}
        <span>
          {activititesThisWeek >= goalMinutes
            ? `Congratulations! Goal Achieved`
            : `${
                timeToGoal < 120
                  ? `${timeToGoal} min`
                  : `${formatMinutesToHours(timeToGoal)} hours`
              }  left to reach your goal`}
        </span>
      </StyledGoalHeadline>
      <GoalWeeklyChart
        weeklyGoal={goalMinutes}
        activitiesPerDay={activitiesPerDay}
      />
      <Slider
        weeklyGoal={weeklyGoal}
        setWeeklyGoal={setWeeklyGoal}
        page={page}
      />
    </Grid>
  )
}
