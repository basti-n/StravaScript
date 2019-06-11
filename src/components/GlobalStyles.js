import React from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Libre+Franklin&display=swap');
:root {
  --primary-color: ${props => props.theme.primaryColor};
  --grey: ${props => props.theme.secondaryColor1};
  --yellow: ${props => props.theme.secondaryColor2};
  --blue: ${props => props.theme.secondaryColor3};
  --highlight-color: ${props => props.theme.fontColorHeadline};
  --toast-background: ${props => props.theme.toastBackground};
  --bg-grey: #D8D8D8;
  --light-font: #FFFFFF;
  --dark-font: #000000;
}

body {
  background: ${props => props.theme.background};
  font-family: 'Libre Franklin', sans-serif;
  font-size: 22px;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media (min-width: 600px) {
   display: flex;
   justify-content: center;
    #root {
    width: 375px;
    height: 667px;
    }
  }
 
/* Styling for Slider */
  .MuiSlider-track {
    background: ${props => props.theme.fontColorHeadline};
    border-radius: 10px;
    color: white;
    height: 2px;
    }

  .MuiSlider-thumb {
    background: 1px solid;
    background-color: ${props => props.theme.background};
    background-image: url('/assets/goal-small.svg') ;
    border: 1px solid ${props => props.theme.secondaryColor1};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    width: 30px;
    height: 30px;}

/* Styling for Toast Notification */
  .Toastify {
    @media(min-width: 600px) {
      position: absolute;
      > * {
        position: relative;
      }
    }
  }

}`

export default function GlobalStyles() {
  return <GlobalStyle />
}
