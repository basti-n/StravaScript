import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PageToggle from '../components/PageToggle'
import GoalSettings from '../components/GoalSettings'
import { StyledLayoutSettingsPage } from '../components/StyledComponents'

export default function GoalsPage({
  codingActivitiesLastWeekByDay,
  stravaActivitiesLastWeekByDay,
  setWeeklyGoal,
  weeklyGoal,
}) {
  const goalPages = ['coding', 'sport']
  const [activeGoalPage, setActiveGoalPage] = useState('coding')

  return (
    <StyledLayoutSettingsPage>
      <PageToggle
        activePage={activeGoalPage}
        pages={goalPages}
        setActivePage={setActiveGoalPage}
      />

      <GoalSettings
        activitiesLastWeekByWeekday={
          activeGoalPage === 'coding'
            ? codingActivitiesLastWeekByDay
            : stravaActivitiesLastWeekByDay
        }
        page={activeGoalPage}
        setWeeklyGoal={setWeeklyGoal}
        weeklyGoal={weeklyGoal}
      />
    </StyledLayoutSettingsPage>
  )
}

GoalsPage.propTypes = {
  codingActivitiesLastWeekByDay: PropTypes.objectOf(PropTypes.number),
  stravaActivitiesLastWeekByDay: PropTypes.objectOf(PropTypes.number),
  setWeeklyGoal: PropTypes.func,
  weeklyGoal: PropTypes.objectOf(PropTypes.number),
}
