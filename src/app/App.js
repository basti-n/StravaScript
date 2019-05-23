import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import uid from 'uid'

import NavigationBar from '../components/NavigationBar'
import {
  getActivitiesFromStrava,
  getTokenFromLocalStorage,
  getTokenFromStrava,
  saveToLocalStorage,
  getFromLocalStorage,
} from '../services'
import ActivityList from '../components/ActivityList'
import TimerClock from '../components/TimerClock'
import TimeTracker from '../components/TimeTracker'

const GlobalStyle = createGlobalStyle`
:root {
  --primary-color: #2E8B57;
  --grey: rgba(216, 216, 214, 0.44);
  --yellow: #FDE100;
  --blue: #0072C2;
  --bg-grey: #D8D8D8;
  --light-font: #FFFFFF;
  --dark-font: #000000;
  --red-font:#DF4D60;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 22px;
}`

const Grid = styled.div`
  display: grid;
  grid-template-rows: 50px 200px 1fr 100px;
`

function App() {
  const [stravaActivities, setStravaActivities] = useState('')
  const [codingActivities, setCodingActivities] = useState(
    getFromLocalStorage('Coding') || []
  )
  const [isStravaLoading, setisStravaLoading] = useState(false)
  const [trackingTime, setTrackingTime] = useState(
    getFromLocalStorage('Tracker') || 0
  )
  const [isTracking, setIsTracking] = useState(trackingTime > 0)

  const token = getTokenFromLocalStorage('token')

  function getStravaActivities(token) {
    getActivitiesFromStrava(token).then(data => {
      setStravaActivities(data)
      saveToLocalStorage('Strava Activities', JSON.stringify(data))
      setisStravaLoading(false)
    })
  }

  useEffect(() => {
    setisStravaLoading(true)
    token
      ? getStravaActivities(token)
      : getTokenFromStrava().then(data => {
          const token = data.access_token
          saveToLocalStorage('token', token)
          getStravaActivities(token)
        })
  }, [token])

  useEffect(() => {
    saveToLocalStorage('Coding', JSON.stringify(codingActivities))
  }, [codingActivities])

  useEffect(() => saveToLocalStorage('Tracker', trackingTime), [trackingTime])

  useEffect(() => {
    let interval

    if (isTracking) {
      const startTime = Date.now()
      interval = setInterval(
        () =>
          setTrackingTime(
            Math.floor((Date.now() - startTime + trackingTime * 1000) / 1000)
          ),
        1000
      )
    } else if (!isTracking && trackingTime) {
      handleTrackingCompleted()
      clearInterval(interval)
    }

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTracking])

  function handleTrackingCompleted() {
    const completedCodingActivity = {
      name: 'Coding Activity',
      type: 'Code',
      id: uid(),
      elapsed_time: trackingTime,
      start_date: new Date().toISOString(),
      languages: ['backend', 'css', 'js'],
    }

    setCodingActivities(prevCodingActivities => [
      ...prevCodingActivities,
      completedCodingActivity,
    ])
    setTrackingTime(0)
  }

  return (
    <Grid>
      <GlobalStyle />
      <TimerClock trackingTime={trackingTime} />
      <TimeTracker
        isTracking={isTracking}
        onTimerClick={() => setIsTracking(prevState => !prevState)}
      />
      <ActivityList
        activities={stravaActivities}
        codingActivities={codingActivities}
      />
      {isStravaLoading && <p>...loading</p>}

      <NavigationBar />
    </Grid>
  )
}

export default App
