import React from 'react'
import TimerButton from '../components/TimerButton'
import ActivityList from '../components/ActivityList'
import TrackingConfirmationModal from '../components/TrackingConfirmationModal'

export default function OverviewPage({
  codingActivities,
  stravaActivities,
  handleTimerClick,
  isTracking,
  onTrackingCompleted,
  showModal,
}) {
  const allActivities = [...stravaActivities, ...codingActivities]
  allActivities.sort((a, b) => (b.start_date > a.start_date ? 1 : -1))

  return (
    <>
      {showModal && (
        <TrackingConfirmationModal onTrackingCompleted={onTrackingCompleted} />
      )}

      <TimerButton
        codingActivities={codingActivities.map(activity => ({
          duration: activity.elapsed_time,
          languages: activity.languages,
        }))}
        stravaActivities={stravaActivities.map(activity => ({
          duration: activity.elapsed_time,
          type: activity.type,
        }))}
        isTracking={isTracking}
        handleTimerClick={handleTimerClick}
      />
      <ActivityList activities={allActivities} />
    </>
  )
}
