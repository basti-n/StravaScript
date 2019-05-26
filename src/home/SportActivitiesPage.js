import React from 'react'
import ActivitySummary from '../components/ActivitySummary'

export default function SportActivityPage({ data }) {
  return (
    <>
      <h1>Sport Activities</h1>
      <ActivitySummary data={data} type="sport" />
    </>
  )
}
