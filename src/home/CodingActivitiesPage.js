import React from 'react'
import ActivitySummary from '../components/ActivitySummary'

export default function CodingActivitiesPage({ data }) {
  return (
    <>
      <h1>Coding Activities</h1>
      <ActivitySummary data={data} activityType="code" />
    </>
  )
}
