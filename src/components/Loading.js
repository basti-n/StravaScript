import React from 'react'
import styled from 'styled-components'

const StyledLoading = styled.div`
  position: absolute;
  top: 80px;
  width: 100%;
  height: 6px;

  > div {
    position: absolute;
    width: 0;
    height: 100%;
    left: 50%;
  }

  div:nth-of-type(1) {
    animation: loading 3s linear infinite;
    background: ${props => props.theme.secondaryColor1};
  }
  div:nth-of-type(2) {
    animation: loading 3s linear 1s infinite;
    background: ${props => props.theme.secondaryColor2};
  }
  div:nth-of-type(3) {
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
    <StyledLoading>
      <div />
      <div />
      <div />
    </StyledLoading>
  )
}
