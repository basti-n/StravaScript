import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import {
  StyledActivityContainer,
  StyledButtonPrimary,
  StyledMainHeadline,
  StyledLayoutSettingsPage,
  StyledRegularText,
} from '../components/StyledComponents'
import Modal from '../components/Modal'
import Loading from '../components/Loading'
import SettingsItem from '../components/SettingsItem'

const StyledGeneralSettingsContainer = styled(StyledActivityContainer)`
  display: flex;
  flex-flow: column;
`

const StyledFeedbackForm = styled.form`
  textarea {
    background: ${props => props.theme.background};
    border: 1px solid;
    border-color: ${props => props.theme.fontColorGrey};
    border-radius: 3px;
    box-sizing: border-box;
    color: ${props => props.theme.fontColor};
    font-family: inherit;
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

const SubmitButton = styled(StyledButtonPrimary)`
  align-items: center;
  display: flex;
  height: 40px;
  justify-content: center;
  margin: 10px 0 24px;
  padding: 5px 10px;
  width: 50%;
`

function SettingsPage({
  handleFeedbackSubmit,
  mailPending,
  modalDuration,
  showModal,
  settings,
  setSettings,
  theme,
}) {
  const formValue = useRef()

  function handleSubmit(event) {
    event.preventDefault()
    event.persist()
    const submitText = formValue.current.value
    if (!submitText) {
      return
    }

    handleFeedbackSubmit(submitText).then(status => {
      status === 200 && event.target.reset()
    })
  }

  return (
    <>
      {mailPending && <Loading />}
      <StyledLayoutSettingsPage>
        <StyledGeneralSettingsContainer>
          <StyledMainHeadline>General</StyledMainHeadline>
          <SettingsItem
            icon={theme.darkModeIcon}
            isChecked={settings.darkMode}
            label="Dark Mode"
            setValue={value =>
              setSettings(prevState => ({ ...prevState, darkMode: value }))
            }
          />
          <SettingsItem
            icon={theme.notificationIcon}
            isChecked={settings.notifications}
            label="Goal Reminder"
            setValue={value =>
              setSettings(prevState => ({ ...prevState, notifications: value }))
            }
          />
        </StyledGeneralSettingsContainer>
        <StyledActivityContainer>
          <StyledMainHeadline>Help us get better.</StyledMainHeadline>
          <StyledRegularText>
            Found any Bugs? Let us know and we’ll fix it ASAP.
          </StyledRegularText>
          <StyledFeedbackForm onSubmit={handleSubmit}>
            <textarea
              placeholder="Describe your findings or ideas here"
              ref={formValue}
            />
            <SubmitButton>Send</SubmitButton>
          </StyledFeedbackForm>
        </StyledActivityContainer>
        {showModal && (
          <Modal
            duration={modalDuration}
            icon="/assets/checkbox_green.svg"
            text="We will review your feedback and get back to you as soon possible."
            title="Feedback sent"
          />
        )}
      </StyledLayoutSettingsPage>
    </>
  )
}

export default withTheme(SettingsPage)

SettingsPage.propTypes = {
  handleFeedbackSubmit: PropTypes.func,
  mailPending: PropTypes.bool,
  modalDuration: PropTypes.number,
  showModal: PropTypes.bool,
  settings: PropTypes.shape({
    darkMode: PropTypes.bool.isRequired,
    goalReminderLastSeen: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    notifications: PropTypes.bool.isRequired,
    userId: PropTypes.number,
  }),
  setSettings: PropTypes.func,
  theme: PropTypes.object,
}
