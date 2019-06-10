import React from 'react'
import styled, { withTheme } from 'styled-components'
import {
  StyledMainHeadline,
  StyledContainer,
  StyledSummaryHeadline,
} from './StyledComponents'
import ActivityLineChart from './ActivityLineChart'
import moment from 'moment'
import {
  getHoursAndMinutesFromMinutes,
  DateLastWeek,
  DateTwoWeeksAgo,
} from '../utils'
moment.locale('de')

const StyledActivitySummary = styled.section`
  display: flex;
  margin: 0 0 30px;
`

function ActivitySummary({ activities, activityType, theme }) {
  function getTotalActivityMinutes(startDate) {
    return Math.round(
      activities
        .filter(activity => activity.start_date > startDate)
        .reduce((acc, curr) => acc + curr.elapsed_time, 0) / 60
    )
  }

  function getLastWeeksActivityMinutesByActivityType(type) {
    const filter =
      activityType === 'code'
        ? activity => activity.languages.includes(type)
        : activity => activity.type === type

    return Math.round(
      activities
        .filter(activity => activity.start_date > DateLastWeek)
        .filter(filter)
        .reduce((arr, curr) => arr + curr.elapsed_time, 0) / 60
    )
  }

  const getLastWeeksActivitiesInMinutesAndHours = getHoursAndMinutesFromMinutes(
    getTotalActivityMinutes(DateLastWeek)
  )
  const getWeekOverWeekActivityMinutesComparison =
    getTotalActivityMinutes(DateLastWeek) -
    (getTotalActivityMinutes(DateTwoWeeksAgo) -
      getTotalActivityMinutes(DateLastWeek))

  function getLastWeeksRelativeActivityTimePerActivityType(type) {
    if (activityType === 'code') {
      return (
        (getLastWeeksActivityMinutesByActivityType(type) /
          (getLastWeeksActivityMinutesByActivityType('backend') +
            getLastWeeksActivityMinutesByActivityType('css') +
            getLastWeeksActivityMinutesByActivityType('js'))) *
        100
      )
    } else if (activityType === 'sport') {
      return (
        (getLastWeeksActivityMinutesByActivityType(type) /
          (getLastWeeksActivityMinutesByActivityType('Workout') +
            getLastWeeksActivityMinutesByActivityType('WeightTraining') +
            getLastWeeksActivityMinutesByActivityType('Ride') +
            getLastWeeksActivityMinutesByActivityType('Run'))) *
        100
      )
    }
  }

  return (
    <StyledContainer>
      <StyledMainHeadline>This Week</StyledMainHeadline>
      <StyledSummaryHeadline>
        {getLastWeeksActivitiesInMinutesAndHours}
        <span>
          {getWeekOverWeekActivityMinutesComparison > 0
            ? `${getHoursAndMinutesFromMinutes(
                Math.abs(getWeekOverWeekActivityMinutesComparison)
              )}in more than last week`
            : `${getHoursAndMinutesFromMinutes(
                Math.abs(getWeekOverWeekActivityMinutesComparison)
              )}in less than last week`}
        </span>
      </StyledSummaryHeadline>

      {activityType === 'code' ? (
        <StyledActivitySummary>
          <ActivityLineChart
            color={theme.fontColorGrey}
            width={getLastWeeksRelativeActivityTimePerActivityType('backend')}
            duration={getHoursAndMinutesFromMinutes(
              getLastWeeksActivityMinutesByActivityType('backend')
            )}
            title="Backend"
          />
          <ActivityLineChart
            color={theme.secondaryColor3}
            width={getLastWeeksRelativeActivityTimePerActivityType('css')}
            duration={getHoursAndMinutesFromMinutes(
              getLastWeeksActivityMinutesByActivityType('css')
            )}
            title="CSS"
          />
          <ActivityLineChart
            color={theme.secondaryColor2}
            width={getLastWeeksRelativeActivityTimePerActivityType('js')}
            duration={getHoursAndMinutesFromMinutes(
              getLastWeeksActivityMinutesByActivityType('js')
            )}
            title="JS"
          />
        </StyledActivitySummary>
      ) : (
        <StyledActivitySummary>
          <ActivityLineChart
            color="#62A881"
            width={getLastWeeksRelativeActivityTimePerActivityType('Ride')}
            duration={getHoursAndMinutesFromMinutes(
              getLastWeeksActivityMinutesByActivityType('Ride')
            )}
            title="Ride"
            icon={theme.sportIcons.bike}
          />
          <ActivityLineChart
            color="#2E8B57"
            width={getLastWeeksRelativeActivityTimePerActivityType('Run')}
            duration={getHoursAndMinutesFromMinutes(
              getLastWeeksActivityMinutesByActivityType('Run')
            )}
            title="Run"
            icon={theme.sportIcons.run}
          />
          <ActivityLineChart
            color="#2E7357"
            width={
              getLastWeeksRelativeActivityTimePerActivityType(
                'WeightTraining'
              ) + getLastWeeksRelativeActivityTimePerActivityType('Workout')
            }
            duration={getHoursAndMinutesFromMinutes(
              getLastWeeksActivityMinutesByActivityType('WeightTraining') +
                getLastWeeksActivityMinutesByActivityType('Workout')
            )}
            title="Strength"
            icon={theme.sportIcons.strength}
          />
        </StyledActivitySummary>
      )}
    </StyledContainer>
  )
}

export default withTheme(ActivitySummary)
