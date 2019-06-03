import React from 'react'
import Slider from '@material-ui/lab/Slider'
import styled from 'styled-components'
import { StyledContainer } from '../components/StyledComponents'

export default function SliderGoal({ weeklyGoal, setWeeklyGoal, page }) {
  function handleGoalChange(event, value) {
    setWeeklyGoal(weeklyGoal => ({ ...weeklyGoal, [page]: value }))
  }

  const StyledSliderHeadline = styled.h5`
    align-items: center;
    display: flex;
    font-size: 18px;
    font-weight: 100;
    margin-bottom: 35px;
    justify-content: center;
    img {
      padding-right: 8px;
    }
    span {
      padding-left: 5px;
      font-weight: 600;
    }
  `

  return (
    <StyledContainer>
      <StyledSliderHeadline>
        weekly goal: <span> {weeklyGoal[page]}h</span>
      </StyledSliderHeadline>
      <Slider
        style={{ touchAction: 'none' }}
        type="range"
        min={0}
        max={20}
        step={1}
        value={weeklyGoal[page]}
        onChange={handleGoalChange}
      />
    </StyledContainer>
  )
}