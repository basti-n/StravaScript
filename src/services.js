import { timeStampLastSevenDays } from './utils'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

// Strava API
const stravaClientId = 35264

const getDataFromStrava = (token, path) =>
  fetch(`https://www.strava.com/api/v3/athlete${path}?access_token=${token}`)
    .then(res => {
      if (res.status === 401) {
        const code = getTokenFromLocalStorage('strava_code')
        return getTokenFromStrava(code).then(data => {
          const { access_token } = data
          saveToLocalStorage('token', access_token)
          return getDataFromStrava(access_token, path)
        })
      }
      return res.json()
    })
    .catch(error => error.json({ errors: [error] }))

export const getActivitiesFromStrava = token =>
  getDataFromStrava(token, '/activities')

export const getAthleteFromStrava = token =>
  getDataFromStrava(token, '').then(data => {
    const { username, id } = data
    const userData = { username, id }
    createOrUpdateUser(userData, id)

    return data
  })

export const disconnectStravaAccount = token =>
  fetch(
    `https://www.strava.com/oauth/deauthorize?client_id=${stravaClientId}&access_token=${token}`,
    { method: 'POST' }
  )
    .then(res => res.json())
    .catch(error => error.json({ errors: [error] }))

export const getTokenFromStrava = code =>
  fetch(`/token?code=${code}`)
    .then(res => res.json())
    .then(data => {
      const {
        access_token,
        refresh_token,
        expires_at,
        athlete: { id, username },
      } = data

      const userData = {
        username,
        access_token,
        refresh_token,
        expires_at,
      }

      createOrUpdateUser(userData, id)

      return data
    })

export const getTokenFromLocalStorage = name => localStorage.getItem(name)
export const removeFromLocalStorage = name => localStorage.removeItem(name)

const sendRequestToBackend = (endpoint, method, data) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(endpoint, options)
}

//Database
export const getUser = id =>
  sendRequestToBackend(`user/${id}`, 'GET').then(res => res.json())

export const createOrUpdateUser = (data, id) => {
  getUser(id).then(user => {
    user.length ? updateUser(data, id) : createUser(data)
  })
}

export const createUser = user => sendRequestToBackend(`/user`, 'POST', user)

export const updateUser = (data, id) =>
  id && sendRequestToBackend(`user/${id}`, 'PATCH', data)

// Email Feedback
export const sendFeedback = (text, user) =>
  sendRequestToBackend('/feedback', 'POST', { text, user })

//Activities
export const sortActivitiesByDate = activities => {
  try {
    return activities.sort((a, b) => (b.start_date > a.start_date ? 1 : -1))
  } catch (err) {
    return []
  }
}

export const getActivitiesForLastWeek = activities => {
  const timestampsLastWeek = timeStampLastSevenDays()

  let activityMinutesPerWeekday = {}
  timestampsLastWeek.map((timestamp, index) => {
    if (index !== 0) {
      let secondsPerDay
      try {
        secondsPerDay = activities
          .filter(
            activity =>
              activity.start_date < timestampsLastWeek[index] &&
              activity.start_date > timestampsLastWeek[index - 1]
          )
          .reduce((acc, curr) => acc + curr.elapsed_time, 0)
      } catch (err) {
        secondsPerDay = 0
      }

      const activityDay = {
        [moment(timestampsLastWeek[index - 1]).format('dddd')]: Math.round(
          secondsPerDay / 60
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

export const getTrackingTimeInSeconds = startTime =>
  (Date.now() - startTime) / 1000

//App Settings
export const showGoalReminder = (
  secondsBetweenNotification,
  isNotificationEnabled,
  notificationLastSeen
) => {
  if (!isNotificationEnabled) {
    return
  }
  const msBetweenNotification = secondsBetweenNotification * 1000
  console.log(msBetweenNotification, Date.now() - notificationLastSeen)
  return Date.now() - notificationLastSeen > msBetweenNotification
    ? true
    : false
}

export const getMinutesLeftToDailyCodingGoal = (
  weeklyGoal,
  codingActivities
) => {
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

//Local Storage
export const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, data)
}

export const getFromLocalStorage = name => {
  return JSON.parse(localStorage.getItem(name))
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

export const getMainPagefromSubPage = page => {
  if (!page) {
    return 'home'
  }
  const index = Object.values(urlMapping)
    .map(value => value.url)
    .indexOf(page)

  return Object.values(urlMapping).map(value => value.mainPage)[index]
}
