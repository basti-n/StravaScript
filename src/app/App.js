import React, { useState, useEffect } from 'react'
import { Router, navigate } from '@reach/router'
import { ThemeProvider } from 'styled-components'

import {
  getFromLocalStorage,
  saveToLocalStorage,
  getTokenFromLocalStorage,
  getTokenFromStrava,
  getActivitiesFromStrava,
  getAthleteFromStrava,
  disconnectStravaAccount,
  getMainPagefromSubPage,
  getActivitiesForLastWeek,
  showGoalReminder,
  getMinutesLeftToDailyCodingGoal,
  getUser,
  updateUser,
  sortActivitiesByDate,
  createCompletedCodingActivity,
  removeUserDataFromLocalStorage,
} from '../services'

import NavBarTop from '../components/NavBarTop'
import HomePage from '../home/HomePage'
import Toast from '../components/Toast'
import NavBar from '../components/NavBar'
import ConnectPage from '../connect/ConnectPage'
import FaqPage from '../connect/FaqPage'
import GoalsPage from '../appsettings/GoalsPage'
import SettingsPage from '../appsettings/SettingsPage'
import { pages } from '../pages'

import getTheme from '../theme'
import GlobalStyles from '../components/GlobalStyles'
import { Grid } from '../components/StyledComponents'

function App() {
  const token = getTokenFromLocalStorage('strava_token')
  const loginToken = getTokenFromLocalStorage('strava_loginToken')
  const [stravaActivities, setStravaActivities] = useState(
    getFromLocalStorage('strava_activities') || []
  )
  const [isStravaLoading, setisStravaLoading] = useState(false)
  const [stravaUser, setStravaUser] = useState({
    username: '...loading',
    profile: '/assets/placeholder_profile.svg',
  })

  const [codingActivities, setCodingActivities] = useState(
    getFromLocalStorage('stravascript_coding') || []
  )
  const [weeklyGoal, setWeeklyGoal] = useState(
    getFromLocalStorage('stravascript_goals') || { coding: 10, sport: 5 }
  )
  const minutesLeftToDailyCodingGoal = getMinutesLeftToDailyCodingGoal(
    weeklyGoal,
    codingActivities
  )
  const [startTime, setStartTime] = useState(
    getFromLocalStorage('stravascript_startTime') || null
  )
  const [isTracking, setIsTracking] = useState(startTime > 0)

  const [settings, setSettings] = useState(
    getFromLocalStorage('stravascript_settings') || {
      userId: null,
      isLoggedIn: false,
      darkMode: false,
      notifications: true,
      goalReminderLastSeen: null,
    }
  )

  const [activePage, setActivePage] = useState(
    getMainPagefromSubPage(window.location.pathname.substr(1)) || 'home'
  )

  // for presentational purposes set to fire after 30sec
  const showReminder = showGoalReminder(
    30,
    settings.notifications,
    settings.goalReminderLastSeen
  )
  const theme = getTheme(settings.darkMode)

  function handleStravaConnect(loginToken) {
    saveToLocalStorage('strava_loginToken', loginToken)
    navigate('../connect')
    setActivePage('connect')
  }

  function getStravaActivities(token) {
    getActivitiesFromStrava(token).then(data => {
      setStravaActivities(data)
      saveToLocalStorage('strava_activities', JSON.stringify(data))
      setisStravaLoading(false)
    })
  }

  function getStravaProfile(token) {
    return getAthleteFromStrava(token).then(data => {
      setStravaUser(data)
      setSettings(prevState => ({
        ...prevState,
        userId: data.id,
      }))
    })
  }

  async function handleStravaDisconnect() {
    try {
      await disconnectStravaAccount(token)
      removeUserDataFromLocalStorage()
      setCodingActivities([])
      setStravaActivities([])
      setSettings(prevState => ({
        ...prevState,
        isLoggedIn: false,
        userId: null,
      }))
      return true
    } catch (error) {
      return new Error('Error disconnecting strava account')
    }
  }

  function handleTimerClick() {
    setIsTracking(prevState => !prevState)
  }

  function handleTrackingCompleted(languages) {
    const completedCodingActivity = createCompletedCodingActivity(
      languages,
      startTime
    )

    setCodingActivities(prevCodingActivities => [
      ...prevCodingActivities,
      completedCodingActivity,
    ])
    setStartTime(null)
  }

  function handlePageChange(targetPage) {
    setActivePage(targetPage)
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  function setGoalReminderLastSeen(time) {
    setSettings(prevState => ({
      ...prevState,
      goalReminderLastSeen: time,
    }))
  }

  function getUserDataFromDatabase() {
    try {
      getUser(settings.userId).then(res => {
        const codingActivities = res.map(data => data.codingActivities)
        const { weeklyGoal, settings } = Object.assign(...res)
        setCodingActivities(...codingActivities)
        setWeeklyGoal(weeklyGoal)
        setSettings(prevState => ({
          ...prevState,
          ...settings,
        }))
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    saveToLocalStorage('stravascript_settings', JSON.stringify(settings))

    updateUser(
      {
        settings: {
          darkMode: settings.darkMode,
          notifications: settings.notifications,
        },
      },
      settings.userId
    )
  }, [settings])

  useEffect(() => {
    if (settings.isLoggedIn && token) {
      getStravaProfile(token)
    }
  }, [settings.isLoggedIn, token])

  useEffect(() => {
    saveToLocalStorage('stravascript_goals', JSON.stringify(weeklyGoal))
    settings.isLoggedIn &&
      updateUser(
        { weeklyGoal: { coding: weeklyGoal.coding, sport: weeklyGoal.sport } },
        settings.userId
      )
  }, [settings.isLoggedIn, settings.userId, weeklyGoal])

  useEffect(() => {
    setisStravaLoading(true)
    if (!loginToken) {
      setSettings(prevState => ({
        ...prevState,
        isLoggedIn: false,
      }))
      setisStravaLoading(false)
    } else {
      setSettings(prevState => ({
        ...prevState,
        isLoggedIn: true,
      }))
      token
        ? getStravaActivities(token)
        : getTokenFromStrava(loginToken).then(data => {
            const token = data.access_token
            saveToLocalStorage('strava_token', token)
            getStravaActivities(token)
          })
    }
  }, [token, loginToken, settings.isLoggedIn])

  useEffect(() => {
    if (settings.isLoggedIn && codingActivities.length) {
      saveToLocalStorage(
        'stravascript_coding',
        JSON.stringify(codingActivities)
      )
      updateUser({ codingActivities }, settings.userId)
    }
  }, [codingActivities, settings.isLoggedIn, settings.userId])

  useEffect(() => saveToLocalStorage('stravascript_startTime', startTime), [
    startTime,
  ])

  useEffect(() => {
    window.onpopstate = () => {
      const newActivePage = getMainPagefromSubPage(
        window.location.pathname.substr(1)
      )
      setActivePage(newActivePage)
    }
  }, [])

  useEffect(() => {
    if (isTracking && !startTime) {
      setStartTime(Date.now())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTracking])

  useEffect(() => {
    settings.isLoggedIn && getUserDataFromDatabase()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.userId])

  return (
    <ThemeProvider theme={theme}>
      <Grid>
        <GlobalStyles />
        <NavBarTop
          activePage={activePage}
          handlePageChange={handlePageChange}
          pages={pages}
          startTime={startTime}
        />
        {showReminder && (
          <Toast
            duration={5}
            setGoalReminderLastSeen={setGoalReminderLastSeen}
            minutesLeftToDailyCodingGoal={minutesLeftToDailyCodingGoal}
            type="goal"
          />
        )}

        <Router primary={false}>
          <HomePage
            path="/*"
            availableLanguages={['backend', 'js', 'css']}
            codingActivities={sortActivitiesByDate(codingActivities)}
            stravaActivities={sortActivitiesByDate(stravaActivities)}
            isLoggedIn={settings.isLoggedIn}
            isStravaLoading={isStravaLoading}
            isTracking={isTracking}
            handlePageChange={handlePageChange}
            handleTimerClick={handleTimerClick}
            handleTrackingCompleted={handleTrackingCompleted}
            showModal={!isTracking && startTime > 0}
          />

          <SettingsPage
            path="settings"
            modalDuration={3}
            username={settings.username}
            settings={settings}
            setSettings={setSettings}
          />

          <ConnectPage
            path="connect/*"
            isLoggedIn={settings.isLoggedIn}
            username={stravaUser.username}
            image={stravaUser.profile}
            handlePageChange={handlePageChange}
            handleStravaDisconnect={handleStravaDisconnect}
            handleStravaConnect={handleStravaConnect}
          />

          <GoalsPage
            path="goals"
            codingActivitiesLastWeekByDay={getActivitiesForLastWeek(
              codingActivities
            )}
            stravaActivitiesLastWeekByDay={getActivitiesForLastWeek(
              stravaActivities
            )}
            weeklyGoal={weeklyGoal}
            setWeeklyGoal={setWeeklyGoal}
          />

          <FaqPage path="faq" />
        </Router>
        <NavBar
          pages={pages}
          activePage={activePage}
          handlePageChange={handlePageChange}
        />
      </Grid>
    </ThemeProvider>
  )
}

export default App
