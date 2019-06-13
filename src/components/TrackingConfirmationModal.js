import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledRegularText } from './StyledComponents'
import LanguagePicker from './LanguagePicker'

const StyledModalBackdrop = styled.div`
  background: ${props => props.theme.modalBackground};
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 3;
`

const StyledModalDialog = styled.section`
  background: ${props => props.theme.primaryColor};
  border-radius: 12px;
  display: grid;
  height: 340px;
  grid-template-rows: 80px 1fr 50px;
  margin: 20vh 10vw;
  position: fixed;
  width: 80vw;
  @media (min-width: 600px) {
    margin: 100px auto;
    position: relative;
    width: 300px;
  }
`

const StyledModalHeader = styled.header`
  background: ${props => props.theme.fontColorHeadline};
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: center;
  position: relative;
  img {
    position: absolute;
    top: -70px;
  }
`

const StyledModalBody = styled.main`
  background: ${props => props.theme.background};
  display: grid;
  grid-template-rows: 50px 60px 1fr;
  padding: 10px 15px;
  h2 {
    color: ${props => props.theme.fontColorHeadline};
    font-size: 28px;
    margin-top: 10px;
    text-align: center;
  }
`

const StyledModalButton = styled.button`
  background: ${props =>
    props.active ? props.theme.fontColorHeadline : '#808080'};
  border: none;
  border-radius: 0 0 10px 10px;
  color: ${props => props.theme.lightFont};
  font-weight: bolder;
  font-size: 18px;
  outline: none;
  padding: 0;
  text-align: center;
`

export default function TrackingConfirmationModal({
  availableLanguages,
  handleTrackingCompleted,
}) {
  const [selectedLanguages, setSelectedLanguages] = useState([])

  function onLanguageSelect() {
    selectedLanguages.length &&
      handleTrackingCompleted(
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
          onClick={onLanguageSelect}
        >
          Save
        </StyledModalButton>
      </StyledModalDialog>
    </StyledModalBackdrop>
  )
}

TrackingConfirmationModal.propTypes = {
  availableLanguages: PropTypes.arrayOf(PropTypes.string),
  handleTrackingCompleted: PropTypes.func,
}
