import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import NavigationBar from '../components/NavigationBar'
import { getActivitiesFromStrava } from '../services'

const GlobalStyle = createGlobalStyle`
  /* Global Styles go here */
`

const Grid = styled.div`
  display: grid;
  grid-template-rows: 200px 1fr;
`
// Test to start GET on /strava
getActivitiesFromStrava().then(data => console.log(data))

function App() {
  return (
    <Grid>
      <GlobalStyle />
      <h1>StravaScript</h1>
      <NavigationBar />
    </Grid>
  )
}

export default App
