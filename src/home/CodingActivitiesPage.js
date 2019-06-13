import React from 'react'
import PropTypes from 'prop-types'
import ActivitySummary from '../components/ActivitySummary'
import ActivityList from '../components/ActivityList'

export default function CodingActivitiesPage({ codingActivities }) {
  return (
    <>
      <ActivitySummary activities={codingActivities} activityType="code" />
      <ActivityList activities={codingActivities} />
    </>
  )
}

CodingActivitiesPage.propTypes = {
  codingActivities: PropTypes.arrayOf(
    PropTypes.shape({
      elapsed_time: PropTypes.number,
      languages: PropTypes.arrayOf(PropTypes.string),
      name: PropTypes.string,
      start_date: PropTypes.string,
      type: PropTypes.string,
    })
  ),
}
