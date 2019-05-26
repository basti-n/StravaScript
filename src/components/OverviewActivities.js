import React from 'react'
import TimeTracker from './TimeTracker'
import ActivityList from './ActivityList'

export default function OverviewActivities({
  codingActivities,
  stravaActivities,
  isTracking,
  onTimerClick,
  isStravaLoading,
}) {
  const allActivities = [...stravaActivities, ...codingActivities]
  allActivities.sort((a, b) => (b.start_date > a.start_date ? 1 : -1))

  return (
    <>
      <TimeTracker
        codingActivities={codingActivities.map(activity => ({
          duration: activity.elapsed_time,
          languages: activity.languages,
        }))}
        stravaActivities={stravaActivities.map(activity => ({
          duration: activity.elapsed_time,
          type: activity.type,
        }))}
        isTracking={isTracking}
        onTimerClick={onTimerClick}
      />
      <ActivityList activities={allActivities} />
      {isStravaLoading && <p>...Loading</p>}
    </>
  )
}
