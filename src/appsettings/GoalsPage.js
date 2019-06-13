import React, { useState } from 'react'
import styled from 'styled-components'
import PageToggle from '../components/PageToggle'
import GoalSettings from '../components/GoalSettings'
import { StyledContainer } from '../components/StyledComponents'

const StyledContainerGoalsPage = styled(StyledContainer)`
  display: grid;
  grid-template-rows: auto 1fr;
`
export default function GoalsPage({
  weeklyGoal,
  setWeeklyGoal,
  stravaActivitiesLastWeekByDay,
  codingActivitiesLastWeekByDay,
}) {
  const [activeGoalPage, setActiveGoalPage] = useState('coding')
  const goalPages = ['coding', 'sport']

  return (
    <StyledContainerGoalsPage>
      <PageToggle
        pages={goalPages}
        activePage={activeGoalPage}
        setActivePage={setActiveGoalPage}
      />

      <GoalSettings
        page={activeGoalPage}
        activitiesLastWeekByWeekday={
          activeGoalPage === 'coding'
            ? codingActivitiesLastWeekByDay
            : stravaActivitiesLastWeekByDay
        }
        weeklyGoal={weeklyGoal}
        setWeeklyGoal={setWeeklyGoal}
      />
    </StyledContainerGoalsPage>
  )
}
