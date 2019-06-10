import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import styled, { withTheme } from 'styled-components'
import {
  StyledMainHeadline,
  StyledContainer,
  StyledHeadlineWithIcon,
  StyledRegularText,
  ButtonPrimary,
  StyledTextLink,
  StyledActivityContainer,
} from '../components/StyledComponents'
import UserProfile from '../components/UserProfile'
import { saveToLocalStorage } from '../services'
import Modal from '../components/Modal'
import NumberedListItem from '../components/NumberedListItem'
import Loading from '../components/Loading'

const NumberedListContainer = styled(StyledActivityContainer)`
  padding: 10px 0 0 20px;
  :last-of-type {
    margin-bottom: 35px;
  }
`

const StyledConnectPageHeadlineWithIcon = styled(StyledHeadlineWithIcon)`
  margin-bottom: 18px;
`

const ButtonDisconnectStrava = styled(ButtonPrimary)`
  background: ${props => props.theme.secondaryButtonColor};
`

function ConnectPage({
  username,
  image,
  setActivePage,
  handleDisconnect,
  isLoggedIn,
  theme,
}) {
  const [showModal, setShowModal] = useState({
    connect: false,
    disconnect: false,
    duration: 3,
  })
  const currentUrl = new URL(document.location).searchParams
  const stravaCode = currentUrl.get('code')
  const authUrl =
    'https://www.strava.com/oauth/authorize?client_id=35264&redirect_uri=http://localhost:3000/connect/strava&response_type=code&scope=read,activity:read_all,profile:read_all,read_all,'

  function onClickToPage(subpage, page, event) {
    event && event.preventDefault()
    navigate(subpage)
    setActivePage(page)
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  function handleRedirect() {
    if (stravaCode !== null) {
      return
    }
    window.location = authUrl
  }

  function onStravaDisconnect() {
    handleDisconnect().then(disconnect => {
      if (disconnect) {
        setShowModal(prevState => ({ ...prevState, disconnect: true }))
        setTimeout(
          () =>
            setShowModal(prevState => ({ ...prevState, disconnect: false })),
          showModal.duration * 1000
        )
      }
    })
  }

  useEffect(() => {
    if (window.location.pathname === '/connect/strava') {
      stravaCode && saveToLocalStorage('strava_code', stravaCode)
      navigate('../connect')
      setActivePage('connect')
      setShowModal(prevState => ({ ...prevState, connect: true }))
      setTimeout(
        () => setShowModal(prevState => ({ ...prevState, connect: false })),
        showModal.duration * 1000
      )
    }
  }, [setActivePage, showModal.duration, stravaCode])

  return (
    <>
      {username === '...loading' && <Loading />}
      <StyledContainer>
        {showModal.disconnect && (
          <Modal
            title="Strava Disconnected"
            text="But no worries: You can reconnect your Strava account at any time. "
            icon="/assets/checkbox_green.svg"
            duration={showModal.duration}
          />
        )}
        {showModal.connect && (
          <Modal
            title="Strava Connected"
            text="Congrats! StravaScript will now automatically show all your Strava Activities."
            icon="/assets/checkbox_green.svg"
            duration={showModal.duration}
          />
        )}
        {!isLoggedIn ? (
          <>
            <StyledConnectPageHeadlineWithIcon>
              <img src={theme.connectIcon} alt="connect icon" />
              <StyledMainHeadline>Connect, Track, …Compare!</StyledMainHeadline>
            </StyledConnectPageHeadlineWithIcon>
            <StyledRegularText>
              Take full advantage of what StravaScript offers you!
            </StyledRegularText>
            <StyledRegularText>
              Connect your Strava account and have all your activities
              automatically synced.
              <br />
            </StyledRegularText>
            <StyledTextLink
              href="/faq"
              onClick={event => onClickToPage('faq', 'connect', event)}
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

            <ButtonPrimary onClick={handleRedirect}>
              Connect to Strava
            </ButtonPrimary>
          </>
        ) : (
          <>
            <StyledHeadlineWithIcon>
              <img src={theme.checkboxIcon} alt="checked icon" />
              <StyledMainHeadline>Strava Account connected</StyledMainHeadline>
            </StyledHeadlineWithIcon>
            <UserProfile username={username} image={image} />
            <StyledRegularText>
              All your activities will be automatically synced. You can check
              out your activities on the home screen.{' '}
            </StyledRegularText>
            <ButtonPrimary onClick={() => onClickToPage('../sport', 'home')}>
              View Activities
            </ButtonPrimary>{' '}
            <StyledRegularText>
              No worries, you can reconnect your Strava Account at one point in
              time.{' '}
            </StyledRegularText>
            <ButtonDisconnectStrava onClick={onStravaDisconnect}>
              Disconnect Account
            </ButtonDisconnectStrava>{' '}
          </>
        )}
      </StyledContainer>
    </>
  )
}

export default withTheme(ConnectPage)
