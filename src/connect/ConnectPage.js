import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import styled, { withTheme } from 'styled-components'
import {
  StyledMainHeadline,
  StyledContainer,
  StyledHeadlineWithIcon,
  StyledRegularText,
  ButtonPrimary,
} from '../components/StyledComponents'
import UserProfile from '../components/UserProfile'
import { saveToLocalStorage } from '../services'

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
  console.log('LOGG', isLoggedIn)
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

  useEffect(() => {
    stravaCode && saveToLocalStorage('strava_code', stravaCode)
    navigate('../connect')
    setActivePage('connect')
  }, [setActivePage, stravaCode])

  return (
    <StyledContainer>
      {!isLoggedIn ? (
        <>
          <StyledHeadlineWithIcon>
            <img src={theme.checkboxIcon} alt="connect icon" />
            <StyledMainHeadline>Connect your Strava Account</StyledMainHeadline>
          </StyledHeadlineWithIcon>
          <StyledRegularText>
            Take full advantage of what StravaScript offers you!
            <br />
            Connect your Strava account and have all your activities
            automatically synced.
            <br />
            <a
              href="/faq"
              onClick={event => onClickToPage('faq', 'connect', event)}
            >
              Find more information in our FAQs.
            </a>
          </StyledRegularText>
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
            All your activities will be automatically synced. You can check out
            your activities on the home screen.{' '}
          </StyledRegularText>
          <ButtonPrimary onClick={() => onClickToPage('../sport', 'home')}>
            View Activities
          </ButtonPrimary>{' '}
          <StyledRegularText>
            No worries, you can reconnect your Strava Account at one point in
            time.{' '}
          </StyledRegularText>
          <ButtonDisconnectStrava onClick={handleDisconnect}>
            Disconnect Account
          </ButtonDisconnectStrava>{' '}
        </>
      )}
    </StyledContainer>
  )
}

export default withTheme(ConnectPage)
