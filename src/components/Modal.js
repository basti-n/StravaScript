import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledRegularText } from './StyledComponents'

const ModalBackground = styled.section`
  background: ${props => props.theme.modalBackground};
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 3;
`

const StyledModal = styled.section`
  background: ${props => props.theme.background};
  border-radius: 12px;
  display: grid;
  grid-template-rows: 80px 1fr;
  height: 20px;
  margin: 25vh 10vw;
  position: fixed;
  width: 80vw;

  @media (min-width: 600px) {
    margin: 100px auto;
    position: relative;
    width: 300px;
  }

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
  align-items: center;
  background: ${props => props.theme.fontColorHeadline};
  border-radius: 10px 10px 0 0;
  color: ${props => props.theme.lightFont};
  display: flex;
  position: relative;
  width: 100%;
  h2 {
    font-size: 22px;
    margin: 0;
  }
  img {
    margin: 0 15px 0 25px;
  }
`

const StyledModalBody = styled.main`
  background: ${props => props.theme.background};
  border-radius: 0 0 10px 10px;
  grid-template-rows: 50px 60px;
  padding: 10px 15px;
`

export default function Modal({ duration, icon, text, title }) {
  return (
    <ModalBackground>
      <StyledModal duration={duration}>
        <StyledModalHeader>
          {icon && <img src={icon} alt={`${title} icon`} />}
          <h2>{title}</h2>
        </StyledModalHeader>
        <StyledModalBody>
          <StyledRegularText>{text}</StyledRegularText>
        </StyledModalBody>
      </StyledModal>
    </ModalBackground>
  )
}

Modal.propTypes = {
  duration: PropTypes.number,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

Modal.defaultProps = {
  duration: 3,
}
