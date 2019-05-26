import React from 'react'
import ActivityCard from './ActivityCard'
import styled from 'styled-components'

const StyledActivityContainer = styled.section`
  margin: 10px;
`

const StyledActivityListHeadline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  h2 {
    font-size: 0.9em;
    color: var(--primary-color);
    font-weight: 600;
  }

  p {
    font-size: 0.6em;
  }
`

export default function ActivityList({ activities }) {
  return (
    <StyledActivityContainer>
      <StyledActivityListHeadline>
        <h2>Recent activities</h2>
        <p>by date ↓</p>
      </StyledActivityListHeadline>
      {activities &&
        activities.map(activity => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
    </StyledActivityContainer>
  )
}
