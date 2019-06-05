import { timeStampLastSevenDays } from './utils'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

// Strava API
const stravaClientId = 35264
export const getActivitiesFromStrava = token =>
  fetch(
    `https://www.strava.com/api/v3/athlete/activities?access_token=${token}`
  )
    .then(res => res.json())
    .catch(error => error.json({ errors: [error] }))

export const getAthlete = token =>
  fetch(`https://www.strava.com/api/v3/athlete?access_token=${token}`)
    .then(res => res.json())
    .catch(error => error.json({ errors: [error] }))

export const disconnectStravaAccount = token =>
  fetch(
    `https://www.strava.com/oauth/deauthorize?client_id=${stravaClientId}&access_token=${token}`,
    { method: 'POST' }
  )
    .then(res => res.json())
    .catch(error => error.json({ errors: [error] }))

// getTokenFromStrava
export const getTokenFromStrava = code =>
  fetch(`/token?code=${code}`).then(res => res.json())

//saveTokenToLocalStorage
export const getTokenFromLocalStorage = name => {
  return localStorage.getItem(name)
}

//RemoveFromLocalStorage
export const removeFromLocalStorage = name => {
  return localStorage.removeItem(name)
}

//Activities
export function getActivitiesForLastWeek(activities) {
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

//Goal Settings
export const showGoalReminder = (hoursBetweenNotification, settings) => {
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

export const getTimeLeftToDailyCodingGoal = (weeklyGoal, codingActivities) => {
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

//set localStorage
export const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, data)
}

//get localStorage
export const getFromLocalStorage = name => {
  return JSON.parse(localStorage.getItem(name))
}

//convert tracked time to minutes and seconds
export const formatToMinutesAndSeconds = seconds => {
  return moment(seconds * 1000).format('mm:ss')
}

export const formatMinutesToHours = minutes => {
  return moment(minutes * 60 * 1000).format('h')
}

export function getTrackingTimeInSeconds(startTime) {
  return (Date.now() - startTime) / 1000
}

//for App Routing
const urlMapping = {
  Home: { url: '/', mainPage: 'home' },
  Code: { url: 'code', mainPage: 'home' },
  Sport: { url: 'sport', mainPage: 'home' },
  Connect: { url: 'connect', mainPage: 'connect' },
  Faq: { url: 'faq', mainPage: 'connect' },
  Goals: { url: 'goals', mainPage: 'goals' },
  Settings: { url: 'settings', mainPage: 'goals' },
}

export function getMainPagefromSubPage(page) {
  if (!page) {
    return 'home'
  }
  const index = Object.values(urlMapping)
    .map(value => value.url)
    .indexOf(page)

  return Object.values(urlMapping).map(value => value.mainPage)[index]
}
