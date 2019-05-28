import React from 'react'
import {
  StyledContainer,
  StyledMainHeadline,
  StyledRegularText,
  StyledOrderedList,
} from '../components/StyledComponents'
import NumberedListItem from '../components/NumberedListItem'

export default function FaqPage() {
  return (
    <StyledContainer>
      <StyledMainHeadline>Welcome to StravaScript</StyledMainHeadline>
      <StyledRegularText>
        <span>
          Remember when you got completely lost in your code spannd span whole
          day went by without you realizing?
        </span>
        <span>
          Remember when you were trying to solve a problem for hours, finally
          giving up late at night just to have it solved first thing in the
          morning?
        </span>
        <span>
          StravaScript allows you to track your time spend coding, set daily
          goals and import workouts from your favourite tracking app Strava. And
          yes, we have intelligent notifications on our product roadmap to
          remind you to take that important break!
        </span>
        <span>
          Let’s get started and stay up-to-date on your coding time in three
          easy steps.
        </span>
      </StyledRegularText>
      <StyledOrderedList>
        <NumberedListItem number={1}>Connect to Strava</NumberedListItem>
        <NumberedListItem number={2}>Track your coding time</NumberedListItem>
        <NumberedListItem number={3}>
          See what you spend your time on
        </NumberedListItem>
      </StyledOrderedList>
    </StyledContainer>
  )
}
