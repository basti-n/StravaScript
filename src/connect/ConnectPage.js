import React from 'react'
import { withTheme } from 'styled-components'
import {
  StyledMainHeadline,
  StyledContainer,
  StyledHeadlineWithIcon,
  StyledRegularText,
  ButtonPrimary,
} from '../components/StyledComponents'
import { navigate } from '@reach/router'
import UserProfile from '../components/UserProfile'

function ConnectPage({ username, image, setActivePage, theme }) {
  function onClickToActivities() {
    navigate('sport')
    setActivePage('home')
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <StyledContainer>
      <StyledHeadlineWithIcon>
        <img src={theme.checkboxIcon} alt="checked icon" />
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
    </StyledContainer>
  )
}

export default withTheme(ConnectPage)
