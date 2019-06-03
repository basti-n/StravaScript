import React from 'react'
import styled from 'styled-components'
import { StyledRegularText } from './StyledComponents'

const ModalBackground = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 50;
  z-index: 3;
`

const StyledModalDialog = styled.section`
  position: fixed;
  margin: 25vh 10vw;
  background: var(--light-font);
  width: 80vw;
  height: 20px;
  display: grid;
  grid-template-rows: 80px 1fr;
  border-radius: 12px;
  transition: all 1s ease;

  animation-duration: ${props => props.duration}s;
  animation-name: anim-open;

  @keyframes anim-open {
    0% {
      opacity: 0;
      transform: scale3d(1.1, 1.1, 1);
    }
    20% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
    80% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
    100% {
      opacity: 0;
      transform: scale3d(0.9, 0.9, 1);
    }
  }
`

const StyledModalHeader = styled.header`
  background: var(--primary-color);
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--light-font);
  position: relative;
  border-radius: 10px 10px 0 0;
  h2 {
    margin: 0;
    font-size: 22px;
  }
  img {
    margin: 0 15px 0 25px;
  }
`

const StyledModalBody = styled.main`
  background: var(--light-font);
  grid-template-rows: 50px 60px;
  padding: 10px 15px;
  border-radius: 0 0 10px 10px;
`

export default function Modal({ title, text, icon, duration }) {
  return (
    <ModalBackground>
      <StyledModalDialog duration={duration}>
        <StyledModalHeader>
          {icon && <img src={icon} alt={`${title} icon`} />}
          <h2>{title}</h2>
        </StyledModalHeader>
        <StyledModalBody>
          <StyledRegularText>{text}</StyledRegularText>
        </StyledModalBody>
      </StyledModalDialog>
    </ModalBackground>
  )
}
