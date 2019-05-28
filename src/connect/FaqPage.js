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
        <p>
          Remember when you got completely lost in your code and a whole day
          went by without you realizing?
        </p>
        <p>
          Remember when you were trying to solve a problem for hours, finally
          giving up late at night just to have it solved first thing in the
          morning?
        </p>
        StravaScript allows you to track your time spend coding, set daily goals
        and import workouts from your favourite tracking app Strava. And yes, we
        have intelligent notifications on our product roadmap to remind you to
        take that important break!
        <p>
          Let’s get started and stay up-to-date on your coding time in three
          easy steps.
        </p>
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
