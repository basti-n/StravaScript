import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import OverviewPage from './OverviewPage'
import SportActivityPage from './SportActivitiesPage'
import CodingActivitiesPage from './CodingActivitiesPage'

export default function HomePage({
  availableLanguages,
  codingActivities,
  stravaActivities,
  handlePageChange,
  handleTimerClick,
  handleTrackingCompleted,
  isLoggedIn,
  isTracking,
  isStravaLoading,
  showModal,
}) {
  return (
    <Router primary={false}>
      <OverviewPage
        path="/"
        availableLanguages={availableLanguages}
        codingActivities={codingActivities}
        stravaActivities={stravaActivities}
        handlePageChange={handlePageChange}
        handleTimerClick={handleTimerClick}
        handleTrackingCompleted={handleTrackingCompleted}
        isLoggedIn={isLoggedIn}
        isTracking={isTracking}
        isStravaLoading={isStravaLoading}
        showModal={showModal}
      />
      <CodingActivitiesPage path="code" codingActivities={codingActivities} />
      <SportActivityPage path="sport" stravaActivities={stravaActivities} />
    </Router>
  )
}

HomePage.propTypes = {
  availableLanguages: PropTypes.arrayOf(PropTypes.string),
  codingActivities: PropTypes.arrayOf(
    PropTypes.shape({
      elapsed_time: PropTypes.number,
      languages: PropTypes.arrayOf(PropTypes.string),
      name: PropTypes.string,
      start_date: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  stravaActivities: PropTypes.arrayOf(PropTypes.object),
  handlePageChange: PropTypes.func,
  handleTrackingCompleted: PropTypes.func,
  handleTimerClick: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isTracking: PropTypes.bool,
  isStravaLoading: PropTypes.bool,
  showModal: PropTypes.bool,
}
