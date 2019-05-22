import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import NavigationBar from '../components/NavigationBar'
import {
  getActivitiesFromStrava,
  getTokenFromLocalStorage,
  getTokenFromStrava,
  saveToLocalStorage,
  getFromLocalStorage
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
  const [activities, setActivities] = useState('')
  const [codingActivities, setCodingActivities] = useState(
    getFromLocalStorage('Coding') || []
  )
  const [isLoading, setIsLoading] = useState(false)
  const [runningTime, setRunningTime] = useState(getFromLocalStorage('Tracker'))
  const token = getTokenFromLocalStorage('token')

  function getStravaActivities(token) {
    getActivitiesFromStrava(token).then(data => {
      setActivities(data)
      saveToLocalStorage('Strava Activities', JSON.stringify(data))
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setIsLoading(true)
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

  useEffect(() => {
    return window.addEventListener(
      'beforeunload',
      saveToLocalStorage('Tracker', runningTime)
    )
  })

  return (
    <Grid>
      <GlobalStyle />
      <TimerClock runningTime={runningTime} />
      <TimeTracker
        runningTime={runningTime}
        setRunningTime={setRunningTime}
        setCodingActivities={setCodingActivities}
      />
      <ActivityList
        activities={activities}
        codingActivities={codingActivities}
      />
      {isLoading && <p>...loading</p>}

      <NavigationBar />
    </Grid>
  )
}

export default App
