import React from 'react'
import styled from 'styled-components'

const StyledLoadingContainer = styled.div`
  height: 6px;
  position: absolute;
  top: 80px;
  width: 100%;

  @media (min-width: 600px) {
    width: 375px;
  }
`

const StyledLoader = styled.div`
  height: 100%;
  left: 50%;
  position: absolute;
  width: 0;

  :nth-of-type(1) {
    animation: loading 3s linear infinite;
    background: ${props => props.theme.secondaryColor1};
  }
  :nth-of-type(2) {
    animation: loading 3s linear 1s infinite;
    background: ${props => props.theme.secondaryColor2};
  }
  :nth-of-type(3) {
    animation: loading 3s linear 2s infinite;
    background-color: ${props => props.theme.secondaryColor3};
  }
  @keyframes loading {
    from {
      left: 50%;
      width: 0;
      z-index: 100;
    }
    33% {
      left: 0;
      width: 100%;
      z-index: 10;
    }
    to {
      left: 0;
      width: 100%;
    }
  }
`

export default function Loading() {
  return (
    <StyledLoadingContainer>
      <StyledLoader />
      <StyledLoader />
      <StyledLoader />
    </StyledLoadingContainer>
  )
}
