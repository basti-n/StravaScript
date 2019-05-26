import React from 'react'
import styled from 'styled-components'
import { Router } from '@reach/router'
import OverviewPage from '../components/OverviewActivities'
import SportActivityPage from './SportActivitiesPage'
import CodingActivitiesPage from './CodingActivitiesPage'

const HomepageLayout = styled.main`
  display: grid;
  overflow: auto;
  position: relative;
`

export default function HomePage({
  codingActivities,
  stravaActivities,
  isTracking,
  onTimerClick,
  isStravaLoading,
}) {
  return (
    <HomepageLayout>
      <Router primary={false}>
        <OverviewPage
          path="/"
          codingActivities={codingActivities}
          stravaActivities={stravaActivities}
          isTracking={isTracking}
          onTimerClick={onTimerClick}
          isStravaLoading={isStravaLoading}
        />
        <CodingActivitiesPage path="code" codingActivities={codingActivities} />
        <SportActivityPage path="sport" stravaActivities={stravaActivities} />
      </Router>
    </HomepageLayout>
  )
}
