import React from 'react'
import {
  StyledMainHeadline,
  StyledContainer,
  StyledHeadlineWithIcon,
  StyledRegularText,
  ButtonPrimary,
} from '../components/StyledComponents'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import UserProfile from '../components/UserProfile'

export default function ConnectPage({ username, image, setActivePage }) {
  function onClickToActivities() {
    navigate('sport')
    setActivePage('home')
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  const StyledConnectPageContainer = styled(StyledContainer)`
    height: 100vh;
  `

  return (
    <StyledConnectPageContainer>
      <StyledHeadlineWithIcon>
        <img src="/assets/checkbox_white-circle.svg" alt="checked icon" />
        <StyledMainHeadline>Strava Account connected</StyledMainHeadline>
      </StyledHeadlineWithIcon>
      <UserProfile username={username} image={image} />
      <StyledRegularText>
        All your activities will be automatically synced. You can check out your
        activities on the home screen.{' '}
      </StyledRegularText>

      <ButtonPrimary onClick={onClickToActivities}>
        View Activities
      </ButtonPrimary>
    </StyledConnectPageContainer>
  )
}
