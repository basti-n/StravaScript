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
      <ActivityList
        activities={stravaActivities}
        codingActivities={codingActivities}
      />
      {isStravaLoading && <p>...Loading</p>}
    </>
  )
}
