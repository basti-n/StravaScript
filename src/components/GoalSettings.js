import React from 'react'
import styled from 'styled-components'
import { StyledMainHeadline } from './StyledComponents'
import Slider from './Slider'
import GoalWeeklyChart from './GoalWeeklyChart'

const StyledGoalHeadline = styled(StyledMainHeadline)`
  display: flex;
  align-items: flex-end;
  padding: 0 10px;

  span {
    color: #b3b3b3;
    font-size: 0.7rem;
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

export default function GoalSettings({ page, weeklyGoal, setWeeklyGoal }) {
  return (
    <Grid>
      <StyledGoalHeadline>
        {page} <span>25 min left to reach your goal</span>
      </StyledGoalHeadline>
      <GoalWeeklyChart />
      <Slider
        weeklyGoal={weeklyGoal}
        setWeeklyGoal={setWeeklyGoal}
        page={page}
      />
    </Grid>
  )
}
