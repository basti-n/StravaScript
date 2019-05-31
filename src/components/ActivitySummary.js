import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import 'moment/locale/de'
import {
  StyledMainHeadline,
  StyledContainer,
  StyledSummaryHeadline,
} from './StyledComponents'
import ActivityOnLineChart from './ActivityOnLineChart'
moment.locale('de')

const StyledStackedLineChart = styled.section`
  display: flex;
  margin: 0 0 30px;
`

export default function ActivitySummary({ data, activityType }) {
  const lastWeek = moment()
    .subtract(7, 'd')
    .format()

  const twoWeeksAgo = moment()
    .subtract(14, 'd')
    .format()

  function getHoursAndMinutesFromMinutes(minutes) {
    return minutes < 60
      ? `${minutes % 60}m`
      : `${Math.floor(minutes / 60)}h ${minutes % 60}m`
  }

  function getTotalMinutes(startDate) {
    return Math.round(
      data
        .filter(data => data.start_date > startDate)
        .reduce((acc, curr) => acc + curr.elapsed_time, 0) / 60
    )
  }

  function getWeeklyActivitiesMinutesByType(type) {
    const filter =
      activityType === 'code'
        ? activity => activity.languages.includes(type)
        : activity => activity.type === type

    return Math.round(
      data
        .filter(data => data.start_date > lastWeek)
        .filter(filter)
        .reduce((arr, curr) => arr + curr.elapsed_time, 0) / 60
    )
  }

  const timeLastWeek = getHoursAndMinutesFromMinutes(getTotalMinutes(lastWeek))
  const weeklyComparison =
    getTotalMinutes(lastWeek) -
    (getTotalMinutes(twoWeeksAgo) - getTotalMinutes(lastWeek))

  function getRelativeTimePerActivityType(type) {
    if (activityType === 'code') {
      return (
        (getWeeklyActivitiesMinutesByType(type) /
          (getWeeklyActivitiesMinutesByType('backend') +
            getWeeklyActivitiesMinutesByType('css') +
            getWeeklyActivitiesMinutesByType('js'))) *
        100
      )
    } else if (activityType === 'sport') {
      return (
        (getWeeklyActivitiesMinutesByType(type) /
          (getWeeklyActivitiesMinutesByType('Workout') +
            getWeeklyActivitiesMinutesByType('WeightTraining') +
            getWeeklyActivitiesMinutesByType('Ride') +
            getWeeklyActivitiesMinutesByType('Run'))) *
        100
      )
    }
  }

  return (
    <StyledContainer>
      <StyledMainHeadline>This Week</StyledMainHeadline>
      <StyledSummaryHeadline>
        {timeLastWeek}
        <span>
          {weeklyComparison > 0
            ? `${getHoursAndMinutesFromMinutes(
                Math.abs(weeklyComparison)
              )}in more than last week`
            : `${getHoursAndMinutesFromMinutes(
                Math.abs(weeklyComparison)
              )}in less than last week`}
        </span>
      </StyledSummaryHeadline>

      {activityType === 'code' ? (
        <StyledStackedLineChart>
          <ActivityOnLineChart
            color="var(--bg-grey)"
            width={getRelativeTimePerActivityType('backend')}
            duration={getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('backend')
            )}
            title="Backend"
          />
          <ActivityOnLineChart
            color="var(--blue)"
            width={getRelativeTimePerActivityType('css')}
            duration={getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('css')
            )}
            title="CSS"
          />
          <ActivityOnLineChart
            color="var(--yellow)"
            width={getRelativeTimePerActivityType('js')}
            duration={getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('js')
            )}
            title="JS"
          />
        </StyledStackedLineChart>
      ) : (
        <StyledStackedLineChart>
          <ActivityOnLineChart
            color="#62A881"
            width={getRelativeTimePerActivityType('Ride')}
            duration={getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('Ride')
            )}
            title="Ride"
            icon="/assets/bike-small.svg"
          />
          <ActivityOnLineChart
            color="#2E8B57"
            width={getRelativeTimePerActivityType('Run')}
            duration={getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('Run')
            )}
            title="Run"
            icon="/assets/run-small.svg"
          />
          <ActivityOnLineChart
            color="#2E7357"
            width={
              getRelativeTimePerActivityType('WeightTraining') +
              getRelativeTimePerActivityType('Workout')
            }
            duration={getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('WeightTraining') +
                getWeeklyActivitiesMinutesByType('Workout')
            )}
            title="Strength"
            icon="/assets/weighttraining-small.svg"
          />
        </StyledStackedLineChart>
      )}
    </StyledContainer>
  )
}
