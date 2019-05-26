import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'
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
import TopbarNav from '../components/TopbarNav'
import HomePage from '../home/HomePage'
import SettingsPage from '../appsettings/SettingsPage'
import ConnectPage from '../connect/ConnectPage'

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
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .active {
  font-weight: bold;
  color: var(--font-light);
  text-decoration: none;
  padding-bottom: 5px;
  border-bottom: 3px solid black;
}

.nav-active {
  transition: all 0.7s ease-in;
  transform: rotateY(360deg);
}

}`

/*Add overflow auto if topbar should not be removed after specific scroll position */
const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 80px 1fr;
`

function App() {
  const [stravaActivities, setStravaActivities] = useState(
    getFromLocalStorage('Strava Activities')
  )
  const [codingActivities, setCodingActivities] = useState(
    getFromLocalStorage('Coding') || []
  )
  const [isStravaLoading, setisStravaLoading] = useState(false)
  // ToDo: Save instead of duration the start time and calculate trackingTime as
  // Date.now() - startTime => trackingTime (then we count up tracking time)
  //clear startDate when saving activity (i.e. stop timer)
  const [trackingTime, setTrackingTime] = useState(
    getFromLocalStorage('Tracker') || 0
  )
  const [isTracking, setIsTracking] = useState(trackingTime > 0)

  const token = getTokenFromLocalStorage('token')
  const subPages = {
    home: {
      page: 'home',
      name: ['View All', 'Coding', 'Sports'],
      src: '/assets/home.svg',
      srcActive: '/assets/home-active.svg',
    },
    connect: {
      page: 'connect',
      name: ['Connect', 'How it works'],
      src: '/assets/connect.svg',
      srcActive: '/assets/connect-active.svg',
    },
    settings: {
      page: 'settings',
      name: ['My Goals', 'Settings'],
      src: '/assets/settings.svg',
      srcActive: '/assets/settings-active.svg',
    },
  }

  const [activePage, setActivePage] = useState('home')

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

  // ToDo: see comment above, dependencyArray = [startTime] => then we write in DB
  // onStop we remove it from localStorGE
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
      <TopbarNav
        subPages={subPages}
        trackingTime={trackingTime}
        activePage={activePage}
      />
      <Router primary={false}>
        <HomePage
          path="/*"
          codingActivities={codingActivities}
          stravaActivities={stravaActivities}
          isTracking={isTracking}
          onTimerClick={() => setIsTracking(prevState => !prevState)}
          isStravaLoading={isStravaLoading}
        />
        <SettingsPage path="settings" />
        <ConnectPage path="connect" />
      </Router>
      <NavigationBar
        subPages={subPages}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </Grid>
  )
}

export default App
