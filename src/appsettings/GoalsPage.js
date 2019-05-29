import React from 'react'
import styled from 'styled-components'
import {
  StyledMainHeadline,
  StyledContainer,
} from '../components/StyledComponents'

const StyledContainerGoalsPage = styled(StyledContainer)`
  display: grid;
  height: calc(100%);
  grid-template-rows: 1fr 1fr;

  > h2:not(first-of-type) {
    margin-top: 0;
  }
`

const StyledGoalSettings = styled.section``

export default function GoalsPage() {
  return (
    <StyledContainerGoalsPage>
      <StyledGoalSettings>
        <StyledMainHeadline>Coding</StyledMainHeadline>
      </StyledGoalSettings>
      <StyledMainHeadline>Sports</StyledMainHeadline>
    </StyledContainerGoalsPage>
  )
}
