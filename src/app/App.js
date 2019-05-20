import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import NavigationBar from '../components/NavigationBar'
import {
  getActivitiesFromStrava,
  getTokenFromStrava,
  saveToLocalStorage,
  getFromLocalStorage
} from '../services'

const GlobalStyle = createGlobalStyle`
  /* Global Styles go here */
`

const Grid = styled.div`
  xdisplay: grid;
  xgrid-template-rows: 200px 1fr 200px;
`

function App() {
  const [activities, setActivities] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const token = getFromLocalStorage('token')

  function getStravaActivities(token) {
    getActivitiesFromStrava(token).then(data => {
      setActivities(data)
      saveToLocalStorage('Strava Activities', JSON.stringify(data))
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setIsLoading(true)
    token
      ? getStravaActivities(token)
      : getTokenFromStrava().then(data => {
          const token = data.access_token
          saveToLocalStorage('token', token)
          getStravaActivities(token)
        })
  }, [token])

  return (
    <Grid>
      <GlobalStyle />
      {isLoading && <p>...loading</p>}
      {activities &&
        activities.map(activity => <p key={activity.id}>{activity.name}</p>)}
      <NavigationBar />
    </Grid>
  )
}

export default App
