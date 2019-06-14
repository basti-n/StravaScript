import React from 'react'
import PropTypes from 'prop-types'
import TimerChart from '../components/TimerChart'
import ActivityList from '../components/ActivityList'
import TrackingConfirmationModal from '../components/TrackingConfirmationModal'
import { sortActivitiesByDate } from '../services'

export default function OverviewPage({
  availableLanguages,
  codingActivities,
  stravaActivities,
  handleTimerClick,
  handleTrackingCompleted,
  isTracking,
  showModal,
}) {
  const allActivities = sortActivitiesByDate([
    ...stravaActivities,
    ...codingActivities,
  ])

  return (
    <>
      {showModal && (
        <TrackingConfirmationModal
          availableLanguages={availableLanguages}
          handleTrackingCompleted={handleTrackingCompleted}
        />
      )}

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
  )
}

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
  handleTimerClick: PropTypes.func,
  handleTrackingCompleted: PropTypes.func,
  isTracking: PropTypes.bool,
  showModal: PropTypes.bool,
}
