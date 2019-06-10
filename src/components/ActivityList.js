import React from 'react'
import PropTypes from 'prop-types'
import ActivityCard from './ActivityCard'
import styled from 'styled-components'
import { StyledActivityContainer } from './StyledComponents'

const StyledActivityFeedHeadline = styled.h2`
  align-items: flex-end;
  color: ${props => props.theme.fontColorHeadline};
  display: flex;
  font-size: 18px;
  font-weight: 600;
  justify-content: space-between;
  margin: 25px 0 16px;
  padding: 0 10px;

  span {
    color: ${props => props.theme.fontColor};
    font-size: 14px;
    font-weight: normal;
    margin-right: 5px;
  }
`

export default function ActivityList({ activities }) {
  return (
    <StyledActivityContainer>
      <StyledActivityFeedHeadline>
        Recent activities
        <span>by date ↓</span>
      </StyledActivityFeedHeadline>
      {activities &&
        activities.map(activity => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
    </StyledActivityContainer>
  )
}

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object),
}
