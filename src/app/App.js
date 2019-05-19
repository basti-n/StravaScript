import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import NavigationBar from '../components/NavigationBar'

const GlobalStyle = createGlobalStyle`
  /* Global Styles go here */
`

const Grid = styled.div`
  display: grid;
  grid-template-rows: 200px 1fr;
`

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
