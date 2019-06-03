import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'
import styled, { createGlobalStyle } from 'styled-components'
import uid from 'uid'
import moment from 'moment'

import NavigationBar from '../components/NavigationBar'
import Toast from '../components/Toast'

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
import timeStampLastSevenDays, { sortActivitiesByDate } from '../utils'
import FaqPage from '../connect/FaqPage'
import GoalsPage from '../appsettings/GoalsPage'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Libre+Franklin&display=swap');
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
  font-family: 'Libre Franklin', sans-serif;
  font-size: 22px;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .nav-active {
    transition: all 0.7s ease-in;
    transform: rotateY(360deg);
  }

  .topbar-active {
  font-weight: bold;
  color: var(--font-light);
  text-decoration: none;
  padding-bottom: 5px;
  border-bottom: 3px solid black;
  }

  .MuiSlider-track {
    background: var(--primary-color);
    height: 2px;
    border-radius: 10px;
    }

  .MuiSlider-thumb {
    width: 30px;
    height: 30px;
    background: white;
    background-image: url('/assets/goal-small.svg');
    border: 1px solid var(--grey);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

}`

/*Add overflow auto if topbar should not be removed after specific scroll position */
const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 80px 1fr;
`

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

const urlMapping = {
  Home: { url: '/', mainPage: 'home' },
  Code: { url: 'code', mainPage: 'home' },
  Sport: { url: 'sport', mainPage: 'home' },
  Connect: { url: 'connect', mainPage: 'connect' },
  Faq: { url: 'faq', mainPage: 'connect' },
  Goals: { url: 'goals', mainPage: 'goals' },
  Settings: { url: 'settings', mainPage: 'goals' },
}

function App() {
  const token = getTokenFromLocalStorage('token')
  const [stravaActivities, setStravaActivities] = useState(
    getFromLocalStorage('Strava Activities') || []
  )
  const [codingActivities, setCodingActivities] = useState(
    getFromLocalStorage('Coding') || []
  )

  const [weeklyGoal, setWeeklyGoal] = useState(
    getFromLocalStorage('Goals') || { coding: 10, sport: 5 }
  )
  const [isStravaLoading, setisStravaLoading] = useState(false)
  const [stravaUser, setStravaUser] = useState({})

  const [settings, setSettings] = useState(
    getFromLocalStorage('Settings') || {
      darkMode: false,
      notifications: true,
      goalReminderLastSeen: null,
    }
  )

  const [startTime, setStartTime] = useState(
    getFromLocalStorage('Start Time') || null
  )
  const [isTracking, setIsTracking] = useState(startTime > 0)

  function getTrackingTimeInSeconds(startTime) {
    return (Date.now() - startTime) / 1000
  }

  function getMainPagefromSubPage(page) {
    if (!page) {
      return 'home'
    }
    const index = Object.values(urlMapping)
      .map(value => value.url)
      .indexOf(page)

    return Object.values(urlMapping).map(value => value.mainPage)[index]
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
      : getTokenFromStrava().then(data => {
          const token = data.access_token
          saveToLocalStorage('token', token)
          getStravaActivities(token)
        })
  }, [token])

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

  function getActivitiesForLastWeek(activities) {
    const timestampsLastWeek = timeStampLastSevenDays()

    let activityMinutesPerWeekday = {}
    timestampsLastWeek.map((timestamp, index) => {
      if (index !== 0) {
        const minutesPerDay = activities
          .filter(
            activity =>
              activity.start_date < timestampsLastWeek[index] &&
              activity.start_date > timestampsLastWeek[index - 1]
          )
          .reduce((acc, curr) => acc + curr.elapsed_time, 0)

        const activityDay = {
          [moment(timestampsLastWeek[index - 1]).format('dddd')]: Math.round(
            minutesPerDay / 60
          ),
        }
        activityMinutesPerWeekday = {
          ...activityMinutesPerWeekday,
          ...activityDay,
        }
      }
      return activityMinutesPerWeekday
    })
    return activityMinutesPerWeekday
  }

  const showGoalReminder = hoursBetweenNotification => {
    // for testing purposes set to fire after 30sec
    if (!settings.notifications) {
      return
    }
    const timeBetweenNotification = hoursBetweenNotification * 24 * 60
    console.log(
      timeBetweenNotification,
      Date.now() - settings.goalReminderLastSeen
    )
    return Date.now() - settings.goalReminderLastSeen > timeBetweenNotification
      ? true
      : false
  }

  const getTimeLeftToDailyCodingGoal = () => {
    const dailyCodingGoalInMinutes = (weeklyGoal.coding / 7) * 60
    const today = moment
      .utc()
      .startOf('day')
      .toISOString()

    const dailyCodingMinutes =
      codingActivities
        .filter(activity => activity.start_date > today)
        .reduce((acc, curr) => acc + curr.elapsed_time, 0) / 60

    return Math.round(dailyCodingGoalInMinutes - dailyCodingMinutes)
  }

  return (
    <Grid>
      <GlobalStyle />
      <TopbarNav
        subPages={subPages}
        startTime={startTime}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {showGoalReminder(30) && (
        <Toast
          timeLeftDailyGoal={getTimeLeftToDailyCodingGoal()}
          setTimeToastLastSeen={lastSeen =>
            setSettings(prevState => ({
              ...prevState,
              goalReminderLastSeen: lastSeen,
            }))
          }
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
        />
        <ConnectPage
          path="connect"
          username={stravaUser.username}
          image={stravaUser.profile}
          setActivePage={setActivePage}
        />
        <GoalsPage
          path="goals"
          weeklyGoal={weeklyGoal}
          setWeeklyGoal={setWeeklyGoal}
          stravaActivitiesByWeekDay={getActivitiesForLastWeek(stravaActivities)}
          codingActivitiesByWeekDay={getActivitiesForLastWeek(codingActivities)}
        />
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
