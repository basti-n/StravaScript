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
  getAthlete,
} from '../services'
import TopbarNav from '../components/TopbarNav'
import HomePage from '../home/HomePage'
import SettingsPage from '../appsettings/SettingsPage'
import ConnectPage from '../connect/ConnectPage'
import { sortActivitiesByDate } from '../utils'
import FaqPage from '../connect/FaqPage'
import GoalsPage from '../appsettings/GoalsPage'

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
  const token = getTokenFromLocalStorage('token')
  const [stravaActivities, setStravaActivities] = useState(
    getFromLocalStorage('Strava Activities')
  )
  const [codingActivities, setCodingActivities] = useState(
    getFromLocalStorage('Coding') || []
  )
  const [isStravaLoading, setisStravaLoading] = useState(false)
  const [stravaUser, setStravaUser] = useState({})

  const [startTime, setStartTime] = useState(
    getFromLocalStorage('Start Time') || null
  )
  const [isTracking, setIsTracking] = useState(startTime > 0)

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

  const mapping = {
    ViewAll: { url: '/', mainPage: 'home' },
    Coding: { url: 'code', mainPage: 'home' },
    Sports: { url: 'sport', mainPage: 'home' },
    Connect: { url: 'connect', mainPage: 'connect' },
    Howitworks: { url: 'faq', mainPage: 'connect' },
    MyGoals: { url: 'goals', mainPage: 'settings' },
    Settings: { url: 'settings', mainPage: 'settings' },
  }

  function getTrackingTimeInSeconds(startTime) {
    return (Date.now() - startTime) / 1000
  }

  function getMainPagefromSubPage(page) {
    if (!page) {
      return 'home'
    }
    const index = Object.values(mapping)
      .map(value => value.url)
      .indexOf(page)

    return Object.values(mapping).map(value => value.mainPage)[index]
  }

  function getLinkToPage(page) {
    return mapping[page.replace(/ /g, '')]
  }

  const [activePage, setActivePage] = useState(
    getMainPagefromSubPage(window.location.pathname.substr(1)) || 'home'
  )

  function getStravaActivities(token) {
    getActivitiesFromStrava(token).then(data => {
      setStravaActivities(data)
      saveToLocalStorage('Strava Activities', JSON.stringify(data))
      setisStravaLoading(false)
    })
  }

  function getStravaProfile(token) {
    return getAthlete(token).then(data => {
      setStravaUser(data)
    })
  }

  useEffect(() => {
    function getMainPagefromSubPage(page) {
      if (!page) {
        return 'home'
      }
      const index = Object.values(mapping)
        .map(value => value.url)
        .indexOf(page)

      return Object.values(mapping).map(value => value.mainPage)[index]
    }

    window.onpopstate = () => {
      const newActivePage = getMainPagefromSubPage(
        window.location.pathname.substr(1)
      )
      setActivePage(newActivePage)
    }
  }, [mapping])

  useEffect(() => {
    getStravaProfile(token)
  }, [token])

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
  useEffect(() => saveToLocalStorage('Start Time', startTime), [startTime])

  useEffect(() => {
    let interval

    if (isTracking && !startTime) {
      setStartTime(Date.now())
    } else if (!isTracking && startTime) {
      handleTrackingCompleted()
      clearInterval(interval)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTracking])

  function handleTrackingCompleted() {
    const completedCodingActivity = {
      name: 'Coding Activity',
      type: 'Code',
      id: uid(),
      elapsed_time: getTrackingTimeInSeconds(startTime),
      start_date: new Date(startTime).toISOString(),
      languages: ['backend', 'css', 'js'],
    }

    setCodingActivities(prevCodingActivities => [
      ...prevCodingActivities,
      completedCodingActivity,
    ])
    setStartTime(null)
  }

  return (
    <Grid>
      <GlobalStyle />
      <TopbarNav
        subPages={subPages}
        startTime={startTime}
        activePage={activePage}
        setActivePage={setActivePage}
        getLinkToPage={getLinkToPage}
      />
      <Router primary={false}>
        <HomePage
          path="/*"
          codingActivities={sortActivitiesByDate(codingActivities)}
          stravaActivities={sortActivitiesByDate(stravaActivities)}
          isTracking={isTracking}
          onTimerClick={() => setIsTracking(prevState => !prevState)}
          isStravaLoading={isStravaLoading}
        />
        <SettingsPage path="settings" />
        <ConnectPage
          path="connect"
          username={stravaUser.username}
          image={stravaUser.profile}
          setActivePage={setActivePage}
        />
        <GoalsPage path="goals" />
        <FaqPage path="faq" />
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
