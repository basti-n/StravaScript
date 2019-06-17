import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { navigate } from '@reach/router'
import TimerChart from '../components/TimerChart'
import ActivityList from '../components/ActivityList'
import TrackingConfirmationModal from '../components/TrackingConfirmationModal'
import { sortActivitiesByDate } from '../services'
import EmptyState from '../components/EmptyState'

function OverviewPage({
  availableLanguages,
  codingActivities,
  stravaActivities,
  handlePageChange,
  handleTimerClick,
  handleTrackingCompleted,
  isLoggedIn,
  isTracking,
  showModal,
  theme,
}) {
  const allActivities = sortActivitiesByDate([
    ...stravaActivities,
    ...codingActivities,
  ])

  function handleEmptyStateButtonClick(event) {
    event.preventDefault()
    navigate('connect')
    handlePageChange('connect')
  }

  return (
    <>
      {showModal && (
        <TrackingConfirmationModal
          availableLanguages={availableLanguages}
          handleTrackingCompleted={handleTrackingCompleted}
        />
      )}
      {isLoggedIn ? (
        <>
          <TimerChart
            codingActivitiesDurationAndType={codingActivities.map(activity => ({
              duration: activity.elapsed_time,
              languages: activity.languages,
            }))}
            stravaActivitiesDurationAndType={stravaActivities.map(activity => ({
              duration: activity.elapsed_time,
              type: activity.type,
            }))}
            handleTimerClick={handleTimerClick}
            isTracking={isTracking}
          />
          <ActivityList activities={allActivities} />
        </>
      ) : (
        <EmptyState
          handleClick={event => handleEmptyStateButtonClick(event)}
          headline="No Activities yet"
          image={theme.emptyStateIcon}
          text="Get started by connecting to Strava."
        />
      )}
    </>
  )
}

export default withTheme(OverviewPage)

OverviewPage.propTypes = {
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
  handleTimerClick: PropTypes.func,
  handleTrackingCompleted: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isTracking: PropTypes.bool,
  showModal: PropTypes.bool,
  theme: PropTypes.object,
}
