import React from 'react'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

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
  const weeklyComparison = getHoursAndMinutesFromMinutes(
    getTotalMinutes(lastWeek) -
      (getTotalMinutes(twoWeeksAgo) - getTotalMinutes(lastWeek))
  )

  return (
    <>
      <h3>Last Week: Total {timeLastWeek}</h3>
      <p>
        {weeklyComparison > 0
          ? `${weeklyComparison} more than last week`
          : `${weeklyComparison} more than last week`}
      </p>

      {activityType === 'code' ? (
        <>
          <p>
            Backend:{' '}
            {getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('backend')
            )}
          </p>
          <p>
            CSS:{' '}
            {getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('css')
            )}
          </p>
          <p>
            JS:{' '}
            {getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('js')
            )}
          </p>
        </>
      ) : (
        <>
          <p>
            Ride:{' '}
            {getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('Ride')
            )}
          </p>
          <p>
            Run:{' '}
            {getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('Run')
            )}
          </p>
          <p>
            Strength:{' '}
            {getHoursAndMinutesFromMinutes(
              getWeeklyActivitiesMinutesByType('WeightTraining') +
                getWeeklyActivitiesMinutesByType('Workout')
            )}
          </p>
        </>
      )}
    </>
  )
}
