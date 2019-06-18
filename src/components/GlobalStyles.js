import React from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Libre+Franklin&display=swap');

body {
  background: ${props => props.theme.background};
  font-family: 'Libre Franklin', sans-serif;
  font-size: 22px;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media (min-width: 600px){
   display: flex;
   justify-content: center;
    #root {
    height: 667px;
    width: 375px;
    }
  }
 
/* Styling for Slider */
  .MuiSlider-track {
    background: ${props => props.theme.fontColorHeadline};
    border-radius: 10px;
    color: ${props => props.theme.lightFont};
    height: 2px;
    }

  .MuiSlider-thumb {
    background: 1px solid;
    background-color: ${props => props.theme.background};
    background-image: url('assets/goal-small.svg');
    border: 1px solid ${props => props.theme.secondaryColor1};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    width: 30px;
    height: 30px;
    }

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
