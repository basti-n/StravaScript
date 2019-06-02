import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

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

// getTokenFromStrava
export const getTokenFromStrava = () => fetch('/token').then(res => res.json())

//saveTokenToLocalStorage
export const getTokenFromLocalStorage = name => {
  return localStorage.getItem(name)
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

export const formatMinutesToMinutes = minutes => {
  return moment(minutes * 60 * 1000).format('mm')
}
