import React from 'react'
import ActivitySummary from '../components/ActivitySummary'
import ActivityList from '../components/ActivityList'

export default function SportActivityPage({ stravaActivities }) {
  return (
    <>
      <ActivitySummary activities={stravaActivities} activityType="sport" />
      <ActivityList activities={stravaActivities} />
    </>
  )
}
