export const getActivitiesFromStrava = token =>
  fetch(
    `https://www.strava.com/api/v3/athlete/activities?access_token=${token}`
  )
    .then(res => res.json())
    .catch(error => error.json({ errors: [error] }))

// getTokenFromStrava
export const getTokenFromStrava = () => fetch('/token').then(res => res.json())

//saveTokenToLocalStorage
export const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, data)
}

//getTokenFromLocalStorage
export const getFromLocalStorage = name => {
  return localStorage.getItem(name)
}
