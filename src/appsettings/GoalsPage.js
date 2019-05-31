import React, { useState } from 'react'
import styled from 'styled-components'
import ToggleSwitch from '../components/ToggleSwitch'
import GoalSettings from '../components/GoalSettings'
import { StyledContainer } from '../components/StyledComponents'

const StyledContainerGoalsPage = styled(StyledContainer)`
  display: grid;
  grid-template-rows: auto 1fr;
`

export default function GoalsPage({ weeklyGoal, setWeeklyGoal }) {
  const [activeGoalPage, setActiveGoalPage] = useState('coding')
  const goalPages = ['coding', 'sport']

  return (
    <StyledContainerGoalsPage>
      <ToggleSwitch
        pages={goalPages}
        activePage={activeGoalPage}
        setActivePage={setActiveGoalPage}
      />

      <GoalSettings
        page={activeGoalPage}
        weeklyGoal={weeklyGoal}
        setWeeklyGoal={setWeeklyGoal}
      />
    </StyledContainerGoalsPage>
  )
}
