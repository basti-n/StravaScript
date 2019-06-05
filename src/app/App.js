import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'
import { ThemeProvider } from 'styled-components'
import uid from 'uid'

import NavigationBar from '../components/NavigationBar'
import Toast from '../components/Toast'

import {
  getActivitiesFromStrava,
  getTokenFromLocalStorage,
  getTokenFromStrava,
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  getAthlete,
  getMainPagefromSubPage,
  getTrackingTimeInSeconds,
  getActivitiesForLastWeek,
  showGoalReminder,
  getTimeLeftToDailyCodingGoal,
  disconnectStravaAccount,
} from '../services'
import TopbarNav from '../components/TopbarNav'
import HomePage from '../home/HomePage'
import SettingsPage from '../appsettings/SettingsPage'
import ConnectPage from '../connect/ConnectPage'
import { sortActivitiesByDate } from '../utils'
import FaqPage from '../connect/FaqPage'
import GoalsPage from '../appsettings/GoalsPage'
import getTheme from '../theme'
import GlobalStyles from '../components/GlobalStyles'
import { Grid } from '../components/StyledComponents'

const subPages = {
  home: {
    page: 'home',
    name: ['View All', 'Coding', 'Sports'],
    path: ['/', '/code', 'sport'],
    src: '/assets/home.svg',
    srcActive: '/assets/home-active.svg',
  },
  connect: {
    page: 'connect',
    name: ['Connect', 'How it works'],
    path: ['/connect', '/faq'],
    src: '/assets/connect.svg',
    srcActive: '/assets/connect-active.svg',
  },
  goals: {
    page: 'goals',
    name: ['My Goals', 'Settings'],
    path: ['/goals', '/settings'],
    src: '/assets/settings.svg',
    srcActive: '/assets/settings-active.svg',
  },
}

function App() {
  const token = getTokenFromLocalStorage('token')
  const code = getTokenFromLocalStorage('strava_code')
  const [stravaActivities, setStravaActivities] = useState(
    getFromLocalStorage('Strava Activities') || []
  )
  const [codingActivities, setCodingActivities] = useState(
    getFromLocalStorage('Coding') || []
  )

  const [weeklyGoal, setWeeklyGoal] = useState(
    getFromLocalStorage('Goals') || { coding: 10, sport: 5 }
  )
  const timeLeftToDailyCodingGoal = getTimeLeftToDailyCodingGoal(
    weeklyGoal,
    codingActivities
  )

  const [isStravaLoading, setisStravaLoading] = useState(false)
  const [stravaUser, setStravaUser] = useState({})

  const [settings, setSettings] = useState(
    getFromLocalStorage('Settings') || {
      isLoggedIn: false,
      darkMode: false,
      notifications: true,
      goalReminderLastSeen: null,
    }
  )

  const [showModal, setShowModal] = useState(false)

  const [startTime, setStartTime] = useState(
    getFromLocalStorage('Start Time') || null
  )
  const [isTracking, setIsTracking] = useState(startTime > 0)

  const [activePage, setActivePage] = useState(
    getMainPagefromSubPage(window.location.pathname.substr(1)) || 'home'
  )

  const theme = getTheme(settings.darkMode)

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

  function handleTrackingCompleted(languages) {
    const completedCodingActivity = {
      name: 'Coding Activity',
      type: 'Code',
      id: uid(),
      elapsed_time: getTrackingTimeInSeconds(startTime),
      start_date: new Date(startTime).toISOString(),
      languages,
    }

    setCodingActivities(prevCodingActivities => [
      ...prevCodingActivities,
      completedCodingActivity,
    ])
    setStartTime(null)
  }

  function handleFeedbackSubmit(feedbackText) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: feedbackText, user: stravaUser.username }),
    }
    fetch('/feedback', options)
      .then(data => {
        if (data.status === 200) {
          setShowModal(true)
          setTimeout(() => {
            setShowModal(false)
          }, 3 * 1000)
        }
      })
      .catch(error => console.log(error.message))
  }

  function handleStravaDisconnect() {
    disconnectStravaAccount(token)
      .then(data => {
        removeFromLocalStorage('token')
        removeFromLocalStorage('strava_code')
        setSettings(prevState => ({
          ...prevState,
          isLoggedIn: false,
        }))
      })
      .catch(error => console.log(error.message))
  }

  function setTimeGoalReminderLastSeen(time) {
    setSettings(prevState => ({
      ...prevState,
      goalReminderLastSeen: time,
    }))
  }

  useEffect(() => {
    window.onpopstate = () => {
      const newActivePage = getMainPagefromSubPage(
        window.location.pathname.substr(1)
      )
      setActivePage(newActivePage)
    }
  }, [])

  useEffect(() => {
    saveToLocalStorage('Settings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    getStravaProfile(token)
  }, [token])

  useEffect(() => saveToLocalStorage('Goals', JSON.stringify(weeklyGoal)), [
    weeklyGoal,
  ])

  useEffect(() => {
    setisStravaLoading(true)
    token
      ? getStravaActivities(token)
      : code &&
        getTokenFromStrava(code).then(data => {
          const token = data.access_token
          saveToLocalStorage('token', token)
          getStravaActivities(token)
          if (!settings.isLoggedIn) {
            setSettings(prevState => ({
              ...prevState,
              isLoggedIn: true,
            }))
          }
        })
  }, [token, code, settings.isLoggedIn])

  useEffect(() => {
    saveToLocalStorage('Coding', JSON.stringify(codingActivities))
  }, [codingActivities])

  useEffect(() => saveToLocalStorage('Start Time', startTime), [startTime])

  useEffect(() => {
    if (isTracking && !startTime) {
      setStartTime(Date.now())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTracking])

  return (
    <ThemeProvider theme={theme}>
      <Grid>
        <GlobalStyles />
        <TopbarNav
          subPages={subPages}
          startTime={startTime}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        {showGoalReminder(30, settings) && (
          <Toast
            timeLeftDailyGoal={timeLeftToDailyCodingGoal}
            setTimeGoalReminderLastSeen={setTimeGoalReminderLastSeen}
          />
        )}

        <Router primary={false}>
          <HomePage
            path="/*"
            codingActivities={sortActivitiesByDate(codingActivities)}
            stravaActivities={sortActivitiesByDate(stravaActivities)}
            isTracking={isTracking}
            onTimerClick={() => setIsTracking(prevState => !prevState)}
            isStravaLoading={isStravaLoading}
            showModal={(!isTracking && startTime) > 0}
            onTrackingCompleted={handleTrackingCompleted}
          />
          <SettingsPage
            path="settings"
            settings={settings}
            setSettings={setSettings}
            modalDuration={3}
            showModal={showModal}
            handleFeedbackSubmit={handleFeedbackSubmit}
          />
          <ConnectPage
            path="connect/*"
            username={stravaUser.username}
            image={stravaUser.profile}
            setActivePage={setActivePage}
            isLoggedIn={settings.isLoggedIn}
            handleDisconnect={handleStravaDisconnect}
          />
          <GoalsPage
            path="goals"
            weeklyGoal={weeklyGoal}
            setWeeklyGoal={setWeeklyGoal}
            stravaActivitiesByWeekDay={getActivitiesForLastWeek(
              stravaActivities
            )}
            codingActivitiesByWeekDay={getActivitiesForLastWeek(
              codingActivities
            )}
          />
          <FaqPage path="faq" />
        </Router>
        <NavigationBar
          subPages={subPages}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </Grid>
    </ThemeProvider>
  )
}

export default App
