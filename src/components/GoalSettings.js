import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledMainHeadline } from './StyledComponents'
import Slider from './GoalSlider'
import GoalWeeklyChart from './GoalWeeklyChart'
import { formatMinutesToHours } from '../utils'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

const StyledGoalHeadline = styled(StyledMainHeadline)`
  align-items: flex-end;
  display: flex;
  padding: 0 10px;
`

const Grid = styled.main`
  display: grid;
  grid-template-rows: 40px 200px 100px 70px;
`

export default function GoalSettings({
  activitiesLastWeekByWeekday,
  page,
  setWeeklyGoal,
  weeklyGoal,
}) {
  const activityMinutesThisWeek = Object.values(
    activitiesLastWeekByWeekday
  ).reduce((arr, curr) => arr + curr, 0)
  const weeklyGoalInMinutes = weeklyGoal[page] * 60
  const MinutesToGoal = weeklyGoalInMinutes - activityMinutesThisWeek
  const goalStatus =
    activityMinutesThisWeek >= weeklyGoalInMinutes
      ? `Congratulations! Goal Achieved`
      : `${
          MinutesToGoal < 120
            ? `${MinutesToGoal} min`
            : `${formatMinutesToHours(MinutesToGoal)} hours`
        }  left to reach your goal`

  return (
    <Grid>
      <StyledGoalHeadline>
        {page}
        <span>{goalStatus}</span>
      </StyledGoalHeadline>
      <GoalWeeklyChart
        dailyGoal={weeklyGoalInMinutes / 7}
        activitiesLastWeekByWeekday={activitiesLastWeekByWeekday}
      />
      <Slider
        weeklyGoal={weeklyGoal}
        setWeeklyGoal={setWeeklyGoal}
        page={page}
      />
    </Grid>
  )
}

GoalSettings.propTypes = {
  activitiesLastWeekByWeekday: PropTypes.objectOf(PropTypes.number),
  page: PropTypes.string,
  setWeeklyGoal: PropTypes.func,
  weeklyGoal: PropTypes.objectOf(PropTypes.number),
}
