import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  StyledActivityContainer,
  StyledButtonPrimary,
  StyledRegularText,
} from './StyledComponents'

const StyledEmptyState = styled(StyledActivityContainer)`
  color: ${props => props.theme.fontColorGrey};
  display: flex;
  flex-flow: column;
  height: calc(100vh - 200px);
  justify-content: center;
  text-align: center;

  img {
    margin: 0 10px 20px 0;
  }
`

const StyledEmptyStateHeadline = styled.h2`
  color: ${props => props.theme.fontColorGrey};
  font-size: 22px;
  letter-spacing: 1px;
  margin-bottom: 0;
  text-transform: uppercase;
`

const StyledEmptyStateSubline = styled(StyledRegularText)`
  margin-bottom: 0;
  text-align: center;
`

export default function EmptyState({ handleClick, headline, image, text }) {
  return (
    <StyledEmptyState>
      <img src={image} alt="empty state icon" />
      <StyledEmptyStateHeadline>{headline}</StyledEmptyStateHeadline>
      <StyledEmptyStateSubline>{text}</StyledEmptyStateSubline>
      <StyledButtonPrimary onClick={handleClick}>
        + Connect Strava
      </StyledButtonPrimary>
    </StyledEmptyState>
  )
}

EmptyState.propTypes = {
  handleClick: PropTypes.func,
  headline: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
}
