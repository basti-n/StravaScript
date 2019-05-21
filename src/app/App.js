import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import NavigationBar from '../components/NavigationBar'
import {
  getActivitiesFromStrava,
  getTokenFromStrava,
  saveToLocalStorage,
  getFromLocalStorage
} from '../services'
import ActivityList from '../components/ActivityList'

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
}`

const Grid = styled.div`
  xdisplay: grid;
  xgrid-template-rows: 200px 1fr 1fr 200px;
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
      <ActivityList activities={activities} />
      {isLoading && <p>...loading</p>}

      <NavigationBar />
    </Grid>
  )
}

export default App
