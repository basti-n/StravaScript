import React, { useRef } from 'react'
import styled, { withTheme } from 'styled-components'
import {
  StyledContainer,
  StyledMainHeadline,
  StyledActivityContainer,
  StyledRegularText,
  ButtonPrimary,
} from '../components/StyledComponents'
import SettingsItem from '../components/SettingsItem'
import Modal from '../components/Modal'

const StyledSettingsPageContainer = styled(StyledContainer)`
  display: grid;
  grid-template-rows: auto 1fr;
`

const StyledGeneralSettingsContainer = styled(StyledActivityContainer)`
  display: flex;
  flex-flow: column;
  justify-items: center;
`

const StyledFeedbackForm = styled.form`
  textarea {
    background: ${props => props.theme.background};
    box-sizing: border-box;
    border: 1px solid;
    border-color: #d8d8d8;
    border-radius: 3px;
    color: ${props => props.theme.fontColor};
    font-family: 'Libre Franklin', sans-serif;
    height: 60px;
    padding: 5px;
    width: 100%;
    &:focus {
      border: 2px solid;
      border-color: ${props => props.theme.fontColorHeadline};
      outline: none;
    }
  }
`

const SubmitButton = styled(ButtonPrimary)`
  margin: 10px 0 24px 0;
  padding: 5px 10px;
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function SettingsPage({
  settings,
  setSettings,
  handleFeedbackSubmit,
  modalDuration,
  showModal,
}) {
  const formValue = useRef()

  function onSubmit(event) {
    event.preventDefault()
    const submitValue = formValue.current.value
    if (!submitValue) {
      return
    }

    handleFeedbackSubmit(submitValue)
    event.target.reset()
  }

  return (
    <StyledSettingsPageContainer>
      <StyledGeneralSettingsContainer>
        <StyledMainHeadline>General</StyledMainHeadline>
        <SettingsItem
          label="Dark Mode"
          icon="/assets/darkMode-icon.svg"
          setValue={value =>
            setSettings(prevState => ({ ...prevState, darkMode: value }))
          }
          isChecked={settings.darkMode}
        />
        <SettingsItem
          label="Goal Reminder"
          icon="/assets/notifications-icon.svg"
          setValue={value =>
            setSettings(prevState => ({ ...prevState, notifications: value }))
          }
          isChecked={settings.notifications}
        />
      </StyledGeneralSettingsContainer>
      <StyledActivityContainer>
        <StyledMainHeadline>Help us get better.</StyledMainHeadline>
        <StyledRegularText>
          Found any Bugs? Let us know and we’ll fix it ASAP.
        </StyledRegularText>
        <StyledFeedbackForm onSubmit={onSubmit}>
          <textarea
            placeholder="Describe your findings or ideas here"
            ref={formValue}
          />
          <SubmitButton>Send</SubmitButton>
        </StyledFeedbackForm>
      </StyledActivityContainer>
      {showModal && (
        <Modal
          title="Feedback sent"
          text="We will review your feedback and get back to you as soon possible."
          icon="/assets/checkbox_green.svg"
          duration={modalDuration}
        />
      )}
    </StyledSettingsPageContainer>
  )
}
