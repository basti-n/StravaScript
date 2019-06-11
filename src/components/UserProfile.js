import React from 'react'
import styled from 'styled-components'

const StyledUserProfile = styled.section`
  display: flex;
  margin-bottom: 40px;

  p {
    color: ${props => props.theme.fontColor};
    padding: 0 4px;
    font-size: 16px;
    span {
      font-weight: bold;
    }
  }
  img {
    margin-left: 30px;
    height: 50px;
    border-radius: 50%;
  }
`

export default function UserProfile({ username, image }) {
  return (
    <StyledUserProfile>
      <p>
        username: <span>{username}</span>
      </p>
      <img
        src={image || '/assets/placeholder_profile.svg'}
        alt="strava profile"
      />
    </StyledUserProfile>
  )
}
