export const getActivitiesFromStrava = () =>
  fetch('/strava')
    .then(res => res)
    .catch(error => console.log(error))
