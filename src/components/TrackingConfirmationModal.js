import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledRegularText } from './StyledComponents'
import LanguagePicker from './LanguagePicker'

const StyledModalBackdrop = styled.div`
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
  margin: 20vh 10vw;
  background: var(--light-font);
  width: 80vw;
  height: 340px;
  display: grid;
  grid-template-rows: 80px 1fr 50px;
  border-radius: 12px;
`

const StyledModalHeader = styled.header`
  background: var(--primary-color);
  position: relative;
  border-radius: 10px 10px 0 0;
  img {
    position: absolute;
    left: 16vw;
    top: -70px;
  }
`

const StyledModalBody = styled.main`
  display: grid;
  grid-template-rows: 50px 60px 1fr;
  padding: 10px 15px;
  h2 {
    color: var(--primary-color);
    margin-top: 10px;
    text-align: center;
    font-size: 28px;
  }
`
const StyledModalButton = styled.button`
  background: ${props => (props.active ? 'var(--primary-color)' : 'grey')};
  color: var(--light-font);
  font-weight: bolder;
  border: none;
  border-radius: 0 0 10px 10px;
  padding: 0;
  font-size: 18px;
  outline: none;
  height: 100%;
  width: 100%;
  text-align: center;
`

export default function TrackingConfirmationModal({ onTrackingCompleted }) {
  const availableLanguages = ['backend', 'js', 'css']
  const [selectedLanguages, setSelectedLanguages] = useState([])

  function onLanguageSelection() {
    selectedLanguages.length &&
      onTrackingCompleted(
        selectedLanguages.sort(
          (a, b) =>
            availableLanguages.indexOf(a) - availableLanguages.indexOf(b)
        )
      )
  }

  return (
    <StyledModalBackdrop>
      <StyledModalDialog>
        <StyledModalHeader>
          <img src="/assets/modal-header-code.svg" alt="code icon" />
        </StyledModalHeader>
        <StyledModalBody>
          <h2>Nice Work!</h2>
          <StyledRegularText>
            Tell us what kind of coding you’ve done and you are good to go!
          </StyledRegularText>
          <LanguagePicker
            availableLanguages={availableLanguages}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
          />
        </StyledModalBody>
        <StyledModalButton
          active={selectedLanguages.length}
          onClick={onLanguageSelection}
        >
          Save
        </StyledModalButton>
      </StyledModalDialog>
    </StyledModalBackdrop>
  )
}
