import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import placeholderImage from '../assets/placeholder_profile.svg'

const StyledUserProfile = styled.section`
  display: grid;
  grid-template-columns: 60% 1fr;
  margin-bottom: 40px;
`

const StyledUserName = styled.p`
  color: ${props => props.theme.fontColor};
  font-size: 16px;
  padding: 0 4px;
  span {
    font-weight: bold;
  }
`

const StyledUserImage = styled.img`
  border-radius: 50%;
  height: 50px;
  margin-left: 15px;
  width: 50px;
`

export default function UserProfile({ image, username }) {
  return (
    <StyledUserProfile>
      <StyledUserName>
        username: <span>{username}</span>
      </StyledUserName>
      <StyledUserImage
        src={image || placeholderImage}
        alt="strava profile image"
      />
    </StyledUserProfile>
  )
}

UserProfile.propTypes = {
  image: PropTypes.string,
  username: PropTypes.string,
}
