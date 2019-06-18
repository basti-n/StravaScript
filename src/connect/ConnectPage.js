import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import styled, { withTheme } from 'styled-components'
import {
  StyledActivityContainer,
  StyledButtonPrimary,
  StyledContainer,
  StyledHeadlineWithIcon,
  StyledMainHeadline,
  StyledRegularText,
  StyledTextLink,
} from '../components/StyledComponents'
import UserProfile from '../components/UserProfile'
import Modal from '../components/Modal'
import NumberedListItem from '../components/NumberedListItem'
import Loading from '../components/Loading'
import checkboxIcon from '../assets/checkbox_green.svg'

const StyledConnectPageHeadline = styled(StyledHeadlineWithIcon)`
  margin-bottom: 18px;
`

const ButtonDisconnectStrava = styled(StyledButtonPrimary)`
  background: ${props => props.theme.secondaryButtonColor};
`

const NumberedListContainer = styled(StyledActivityContainer)`
  padding: 10px 0 0 20px;
  :last-of-type {
    margin-bottom: 35px;
  }
`

function ConnectPage({
  handlePageChange,
  handleStravaConnect,
  handleStravaDisconnect,
  image,
  isLoggedIn,
  theme,
  username,
}) {
  const [showModal, setShowModal] = useState({
    connect: false,
    disconnect: false,
    duration: 3,
  })
  const currentPath = new URL(document.location).searchParams
  const stravaCode = currentPath.get('code')
  const redirectURL = `${document.location.origin}/connect/strava`
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=35264&redirect_uri=${redirectURL}&response_type=code&scope=read,activity:read_all,profile:read_all,read_all,`

  function startAuthorization() {
    if (stravaCode) {
      return
    }
    window.location = authUrl
  }

  function onStravaDisconnect() {
    handleStravaDisconnect()
      .then(isDisconnected => {
        if (isDisconnected) {
          showConfirmationModal('disconnect')
        }
      })
      .catch(err => window.alert(err.message))
  }

  function onStravaConnect(code) {
    handleStravaConnect(code)
    showConfirmationModal('connect')
  }

  function showConfirmationModal(type) {
    setShowModal(prevState => ({
      ...prevState,
      [type]: true,
    }))
    setTimeout(
      () => setShowModal(prevState => ({ ...prevState, [type]: false })),
      showModal.duration * 1000
    )
  }

  function onClickTextLink(subpage, page, event) {
    event.preventDefault()
    navigate(subpage)
    handlePageChange(page)
  }

  useEffect(() => {
    if (window.location.pathname === '/connect/strava') {
      stravaCode && onStravaConnect(stravaCode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stravaCode])

  return (
    <>
      {username === '...loading' && isLoggedIn && <Loading />}
      <StyledContainer>
        {showModal.disconnect && (
          <Modal
            duration={showModal.duration}
            icon={checkboxIcon}
            text="But no worries: You can reconnect your Strava account at any time. "
            title="Strava Disconnected"
          />
        )}
        {showModal.connect && (
          <Modal
            duration={showModal.duration}
            icon={checkboxIcon}
            text="Congrats! StravaScript will now automatically show all your Strava Activities."
            title="Strava Connected"
          />
        )}
        {!isLoggedIn ? (
          <>
            <StyledConnectPageHeadline>
              <img src={theme.connectIcon} alt="connect icon" />
              <StyledMainHeadline>Connect, Track, …Compare!</StyledMainHeadline>
            </StyledConnectPageHeadline>
            <StyledRegularText>
              Take full advantage of what StravaScript offers you!
            </StyledRegularText>
            <StyledRegularText>
              Connect your Strava account and have all your activities
              automatically synced.
            </StyledRegularText>
            <StyledTextLink
              href="/faq"
              onClick={event => onClickTextLink('faq', 'connect', event)}
            >
              Find more information in our FAQs.
            </StyledTextLink>
            <NumberedListContainer>
              <NumberedListItem number={1}>
                Click on Connect to Strava
              </NumberedListItem>
              <NumberedListItem number={2}>
                Confirm StravaScript Access
              </NumberedListItem>
              <NumberedListItem number={3}>
                Enjoy the Strava in StravaScript
              </NumberedListItem>
            </NumberedListContainer>

            <StyledButtonPrimary onClick={startAuthorization}>
              Connect to Strava
            </StyledButtonPrimary>
          </>
        ) : (
          <>
            <StyledHeadlineWithIcon>
              <img
                alt="checked icon"
                src={theme.checkboxIcon}
                style={{
                  visibility: username === '...loading' && 'hidden',
                }}
              />

              <StyledMainHeadline>
                {username === '...loading'
                  ? '...Loading User Information'
                  : 'Strava Account connected'}
              </StyledMainHeadline>
            </StyledHeadlineWithIcon>
            <UserProfile username={username} image={image} />
            <StyledRegularText>
              All your activities will be automatically synced. You can check
              out your activities on the home screen.
            </StyledRegularText>
            <StyledButtonPrimary
              onClick={event => onClickTextLink('../sport', 'home', event)}
            >
              View Activities
            </StyledButtonPrimary>
            <StyledRegularText>
              No worries, you can reconnect your Strava Account at one point in
              time.
            </StyledRegularText>
            <ButtonDisconnectStrava onClick={onStravaDisconnect}>
              Disconnect Account
            </ButtonDisconnectStrava>
          </>
        )}
      </StyledContainer>
    </>
  )
}

export default withTheme(ConnectPage)

ConnectPage.propTypes = {
  handlePageChange: PropTypes.func,
  handleStravaConnect: PropTypes.func,
  handleStravaDisconnect: PropTypes.func,
  image: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  theme: PropTypes.object,
  username: PropTypes.string,
}
