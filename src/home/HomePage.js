import React from 'react'
import styled from 'styled-components'
import { Router } from '@reach/router'
import OverviewPage from './OverviewPage'
import SportActivityPage from './SportActivitiesPage'
import CodingActivitiesPage from './CodingActivitiesPage'

const HomepageLayout = styled.main`
  display: grid;
  overflow: auto;
  position: relative;
`

export default function HomePage({
  availableLanguages,
  codingActivities,
  stravaActivities,
  handleTimerClick,
  isTracking,
  isStravaLoading,
  onTrackingCompleted,
  showModal,
}) {
  return (
    <HomepageLayout>
      <Router primary={false}>
        <OverviewPage
          path="/"
          availableLanguages={availableLanguages}
          codingActivities={codingActivities}
          stravaActivities={stravaActivities}
          isTracking={isTracking}
          handleTimerClick={handleTimerClick}
          isStravaLoading={isStravaLoading}
          onTrackingCompleted={onTrackingCompleted}
          showModal={showModal}
        />
        <CodingActivitiesPage path="code" codingActivities={codingActivities} />
        <SportActivityPage path="sport" stravaActivities={stravaActivities} />
      </Router>
    </HomepageLayout>
  )
}
