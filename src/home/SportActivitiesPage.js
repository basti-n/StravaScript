import React from 'react'
import PropTypes from 'prop-types'
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

SportActivityPage.propTypes = {
  stravaActivities: PropTypes.arrayOf(PropTypes.object),
}
