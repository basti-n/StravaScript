import React from 'react'
import ActivitySummary from '../components/ActivitySummary'
import ActivityList from '../components/ActivityList'

export default function CodingActivitiesPage({ codingActivities }) {
  return (
    <>
      <ActivitySummary data={codingActivities} activityType="code" />
      <ActivityList activities={codingActivities} />
    </>
  )
}
